(function () {
    window.SceneManager = SceneManager;

    function SceneManager (options) {
        this.canvas = document.querySelector(options.canvasId);

        this.vsSource = `
            attribute vec4 aVertexPosition;
            attribute vec4 aVertexColor;
            uniform mat4 uModelViewMatrix;
            uniform mat4 uProjectionMatrix;
            varying lowp vec4 vColor;
            void main(void) {
              gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
              vColor = aVertexColor;
            }
        `;

        this.fsSource = `
            varying lowp vec4 vColor;
            void main(void) {
              gl_FragColor = vColor;
            }
        `;

        this.positions = [
            // Front face
            0, 0, 1.0,
            1.0, 0, 1.0,
            1.0, 1.0, 1.0,
            0, 1.0, 1.0,

            // Back face
            0, 0, 0,
            1.0, 0, 0,
            1.0, 1.0, 0,
            0, 1.0, 0,

            // Top face
            0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, 0,
            0, 1.0, 0,

            // Bottom face
            0, 0, 1.0,
            1.0, 0, 1.0,
            1.0, 0, 0,
            0, 0, 0,

            // Right face
            1.0, 0, 1.0,
            1.0, 0, 0,
            1.0, 1.0, 0,
            1.0, 1.0, 1.0,

            // Left face
            0, 0, 1.0,
            0, 0, 0,
            0, 1.0, 0,
            0, 1.0, 1.0
        ];

        const faceColors = [
            [1.0,  1.0,  1.0,  1.0],    // Front face: white
            [1.0,  0.0,  0.0,  1.0],    // Back face: red
            [0.0,  1.0,  0.0,  1.0],    // Top face: green
            [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
            [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
            [1.0,  0.0,  1.0,  1.0],    // Left face: purple
        ];

        let colors = [];

        for (let j = 0; j < faceColors.length; ++j) {
            const c = faceColors[j];

            colors = colors.concat(c, c, c, c);
        }

        this.colors = colors;

        this.indices = [
            0,  1,  2,      0,  2,  3,    // front
            4,  5,  6,      4,  6,  7,    // back
            8,  9,  10,     8,  10, 11,   // top
            12, 13, 14,     12, 14, 15,   // bottom
            16, 17, 18,     16, 18, 19,   // right
            20, 21, 22,     20, 22, 23   // left
        ];

        this.fieldOfView = 45 * Math.PI / 180;
        this.zNear = 0.1;
        this.zFar = 100.0;

        this.then = 0;
        this.cubeRotation = 0;

        this.radius = 1.7;
        this.x = 0;
        this.y = 2;
        this.angle = 0;
        this.deltaAngle = 0.01;

        this.gl = null;
        this.programInfo = null;
        this.buffers = null;

        this.initialize();
    }

    SceneManager.prototype = {
        initialize: function () {
            this.gl = this.initWebGL(this.canvas);

            if (!this.gl) {
                alert('Unable to initialize WebGL. Your browser or machine may not support it.');
                return;
            }


            const shaderProgram = this.initShaderProgram(this.gl, this.vsSource, this.fsSource);

            this.programInfo = {
                program: shaderProgram,
                attribLocations: {
                    vertexPosition: this.gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
                    vertexColor: this.gl.getAttribLocation(shaderProgram, 'aVertexColor'),
                },
                uniformLocations: {
                    projectionMatrix: this.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
                    modelViewMatrix: this.gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
                },
            };

            this.buffers = this.initBuffers(this.gl);

            window.requestAnimationFrame(this.render.bind(this));
        },

        initWebGL: function (canvas) {
            let gl = null;

            gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

            if (!gl) {
                alert("Unable to initialize WebGL. Your browser may not support it.");
                gl = null;
            }

            return gl;
        },

        initShaderProgram: function (gl, vsSource, fsSource) {
            const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
            const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

            const shaderProgram = gl.createProgram();

            gl.attachShader(shaderProgram, vertexShader);
            gl.attachShader(shaderProgram, fragmentShader);
            gl.linkProgram(shaderProgram);

            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
                return null;
            }

            return shaderProgram;
        },

        loadShader: function (gl, type, source) {
            const shader = gl.createShader(type);

            gl.shaderSource(shader, source);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);

                return null;
            }

            return shader;
        },

        initBuffers: function (gl) {
            const positionBuffer = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);

            const colorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);

            const indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
                new Uint16Array(this.indices), gl.STATIC_DRAW);

            return {
                position: positionBuffer,
                color: colorBuffer,
                indices: indexBuffer,
            };
        },

        render: function (now) {
            now *= 0.001;
            const deltaTime = now - this.then;
            this.then = now;

            this.drawScene(this.gl, this.programInfo, this.buffers, deltaTime);

            window.requestAnimationFrame(this.render.bind(this));
        },

        drawScene: function (gl, programInfo, buffers, deltaTime) {
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clearDepth(1.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);

            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
            const projectionMatrix = mat4.create();

            mat4.perspective(projectionMatrix,
                this.fieldOfView,
                aspect,
                this.zNear,
                this.zFar);

            const modelViewMatrix = mat4.create();

            this.x = this.radius * Math.cos(Math.PI - this.angle);
            this.y = this.radius * Math.sin(Math.PI - this.angle);

            this.angle = (this.angle + this.deltaAngle === 2 * Math.PI) ? 0 : this.angle + this.deltaAngle;

            mat4.translate(modelViewMatrix,
                modelViewMatrix,
                [this.x, this.y, -6.0]);

            mat4.rotate(modelViewMatrix,
                modelViewMatrix,
                10,
                [1, 0, 0]);

            mat4.rotate(modelViewMatrix,
                modelViewMatrix,
                this.cubeRotation * .7,
                [0, 1, 0]);

            {
                const numComponents = 3;
                const type = gl.FLOAT;
                const normalize = false;
                const stride = 0;
                const offset = 0;
                gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
                gl.vertexAttribPointer(
                    programInfo.attribLocations.vertexPosition,
                    numComponents,
                    type,
                    normalize,
                    stride,
                    offset);
                gl.enableVertexAttribArray(
                    programInfo.attribLocations.vertexPosition);
            }

            {
                const numComponents = 4;
                const type = gl.FLOAT;
                const normalize = false;
                const stride = 0;
                const offset = 0;
                gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
                gl.vertexAttribPointer(
                    programInfo.attribLocations.vertexColor,
                    numComponents,
                    type,
                    normalize,
                    stride,
                    offset);
                gl.enableVertexAttribArray(
                    programInfo.attribLocations.vertexColor);
            }

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

            gl.useProgram(programInfo.program);

            gl.uniformMatrix4fv(
                programInfo.uniformLocations.projectionMatrix,
                false,
                projectionMatrix);
            gl.uniformMatrix4fv(
                programInfo.uniformLocations.modelViewMatrix,
                false,
                modelViewMatrix);

            {
                const vertexCount = 36;
                const type = gl.UNSIGNED_SHORT;
                const offset = 0;
                gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
            }

            this.cubeRotation += deltaTime;
        }
    };

})();