(function (views, utils) {
    views.MatrixView = MatrixView;

    function MatrixView (options) {
        this._container = options.container;
        this._clickEvent = options.clickEvent;

        this._matrix = [];
        this._style = [
            "default-cell",
            "seaweed-cell",
            "fish-cell",
            "piranha-cell"
        ];
    }

    MatrixView.prototype = {
        render: function (params) {
            /*
                params = {
                    x: [Number],
                    y: [Number]
                }
             */
            var x,
                y,
                html;

            x = params.x;
            y = params.y;

            this.renderMatrix(params);

            html = "";

            for (var i = 0; i < y; i++) {
                html += this.getRowTemplate(+x);
            }

            html = "<table class='ocean-matrix'>" + html + "</table>";

            $(this._container).html(html);
        },

        renderMatrix: function (params) {
            var x,
                y;

            x = params.x;
            y = params.y;

            for (var i = 0; i < y; i++) {
                this._matrix[i] = [];

                for (var j = 0; j < x; j++) {
                    this._matrix[i].push(0);
                }
            }
        },

        getRowTemplate: function (x) {
            var html;

            html = "";

            for (var i = 0; i < x; i++) {
                html += "<td class='default-cell'></td>";
            }

            html = "<tr>" + html + "</tr>";

            return html;
        },

        // initEvents: function () {
        //     $(this._container + " .ocean-matrix").on("click", this.tableClickHandler.bind(this));
        // },

        tableClickHandler: function (e) {
            var clickParams,
                x,
                y;

            x = $(e.target).index();
            y = $(e.target).parents("tr").index();

            clickParams = {
                x: x,
                y: y,
                state: this._matrix[y][x]
            };

            utils.mediator.publish(this._clickEvent, clickParams);
        },

        onModifyMode: function () {
            $(this._container + " .ocean-matrix").on("click", this.tableClickHandler.bind(this));
        },

        offModifyMode: function () {
            $(this._container + " .ocean-matrix").off("click");
        },

        setState: function (params) {
            $(this._container + " tr:nth-child(" + (params.y+1) + ") td:nth-child(" + (params.x+1) + ")")
                .addClass(this._style[params.state]);

            this._matrix[params.y][params.x] = params.state;
        },

        removeState: function (params) {
            $(this._container + " tr:nth-child(" + (params.y+1) + ") td:nth-child(" + (params.x+1) + ")")
                .removeClass(this._style[params.state]);

            this._matrix[params.y][params.x] = 0;
        },

        getMatrix: function () {
            return this._matrix;
        },

        isFreeState: function (params) {
            return (this._matrix[params.y][params.x] === 0);
        }
    };

})(app.views, app.utils);