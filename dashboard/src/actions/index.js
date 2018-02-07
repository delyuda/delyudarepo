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