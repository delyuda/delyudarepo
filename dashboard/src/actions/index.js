import mockData from '../mocks/mockData';

export function loadData() {
    return dispatch => {

        dispatch({
            type: 'LOAD_DATA_REQUESTED'
        });

        setTimeout(() => {
            dispatch({
                type: 'LOAD_DATA_OK',
                data: mockData
            });
        }, 500);


        // request.get(
        //     Routes.root_path(),
        //     {headers: {'Accept': 'application/json'}}
        // )
        //     .then(result => {
        //         dispatch({
        //             type: 'LOAD_DATA_OK',
        //             data: result.data
        //         })
        //     })
        //     .catch(result => {
        //         dispatch({
        //             type: 'LOAD_DATA_FAIL',
        //             errors: result.statusText
        //         })
        //     })
    }
}

export const addGroup = ({title}) => {
    return {
        type: 'ADD_GROUP',
        title: title
    }
};

export const updateGroup = ({id, title}) => {
    return {
        type: 'UPDATE_GROUP',
        title,
        id
    }
};

export const removeGroup = ({id}) => {
    return {
        type: 'REMOVE_GROUP',
        id: id
    }
};

export const addTask = ({groupId, title, description, date}) => {
    return {
        type: 'ADD_TASK',
        groupId,
        title,
        description,
        date
    }
};

export const removeTask = (id) => {
    return {
        type: 'REMOVE_TASK',
        id
    }
};

export const replaceTask = ({taskId, groupId, posIndex}) => {
    return {
        type: 'REPLACE_TASK',
        taskId,
        groupId,
        posIndex
    }
};

export const updateTask = ({id, title, description, date}) => {
    return {
        type: 'UPDATE_TASK',
        id,
        title,
        description,
        date
    }
};


const mockAuthResponse = {
    userName: 'Bruce Wayne',
    authState: true
};

const mockAuthFailResponse = {
    userName: '',
    authState: false
};

export function login (params) {
    return dispatch => {
        dispatch({
            type: 'AUTH_REQUESTED'
        });

        let response = (params.email === 'batman@gmail.com' && params.password === 'batman') ?
            mockAuthResponse : mockAuthFailResponse;

        setTimeout(() => {
            dispatch({
                type: 'AUTH_OK',
                response: response
            });
        }, 2000);
    }
}

export function logout () {
    return dispatch => {
        dispatch({
            type: 'LOGOUT_REQUESTED'
        });

        setTimeout(() => {
            dispatch({
                type: 'LOGOUT_OK',
                response: {
                    authState: false
                }
            });
        }, 500);
    }
}
