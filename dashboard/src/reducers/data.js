const defaultState = { loading: false, data: [], errors: null };

function data (state = defaultState, action) {
    switch (action.type) {

        case 'LOAD_DATA_REQUESTED':
            return { loading: true, data: [] };

        case 'LOAD_DATA_OK':
            return { loading: false, data: action.data, errors: null };

        case 'LOAD_DATA_FAIL':
            return { loading: false, data: [], errors: action.errors };

        case 'ADD_GROUP':
            const groupId = calculateGroupId(state.data);

            state.data = [...state.data, {
                id: groupId,
                title: action.title,
                tasks: []
            }];

            return state;

        case 'UPDATE_GROUP':
            state.data.some( item => {
                if (item.id === action.id) {
                    item.title = action.title;
                    return true;
                }
                return false;
            });

            return {
                loading: false,
                data: state.data,
                errors: action.errors
            };

        case 'REMOVE_GROUP':
            const updatedData = state.data.filter(item =>
                (item.id !== action.id));
            return {
                loading: false,
                data: updatedData,
                errors: action.errors
            };

        case 'ADD_TASK':
            const taskId = calculateTaskId(state.data);

            state.data.some( item => {
                if (item.id === action.groupId) {
                    item.tasks.push({
                        id: taskId,
                        title: action.title,
                        description: action.description,
                        date: action.date
                    });

                    return true;
                }
                return false;
            });

            return state;

        case 'REMOVE_TASK':
            state.data.some( item => {
                return item.tasks.some( (task,i) => {
                    if (task.id === action.id) {
                        item.tasks.splice(i,1);

                        return true;
                    }
                    return false;
                });
            });

            return {
                loading: false,
                data: state.data,
                errors: action.errors
            };

        case 'REPLACE_TASK':
            let taskData;

            state.data.some( item => {
                return item.tasks.some( (task,i) => {
                    if (task.id === action.taskId) {
                        taskData = item.tasks.splice(i,1);

                        return true;
                    }
                    return false;
                });
            });

            state.data.some( item => {
                if (item.id === action.groupId) {
                    item.tasks.splice(action.posIndex, 0, taskData[0]);
                    return true;
                }
                return false;
            });

            return {
                loading: false,
                data: state.data,
                errors: action.errors
            };

        case 'UPDATE_TASK':
            state.data.some( item => {
                return item.tasks.some( (task) => {
                    if (task.id === action.id) {
                        task.title = action.title;
                        task.description = action.description;
                        task.date = action.date;

                        return true;
                    }
                    return false;
                });
            });

            return {
                loading: false,
                data: state.data,
                errors: action.errors
            };


        default:
            return state;
    }
}

function calculateGroupId (data) {
    return data.reduce( (maxId, item) =>
        (item.id > maxId) ? item.id : maxId, 0) + 1;
}

function calculateTaskId (data) {
    return data.reduce( (maxId, item) => {
        const itemMaxId = item.tasks.reduce( (maxId, task ) =>
            (task.id > maxId) ? task.id : maxId, 0);

        return (itemMaxId > maxId) ? itemMaxId : maxId;
    }, 0) + 1;
}

export default data;