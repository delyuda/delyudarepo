export const addItem = ({title, description}) => {
    return {
        type: 'ADD_ITEM',
        title,
        description
    }
};

export const removeItem = id => {
    return {
        type: 'REMOVE_ITEM',
        id
    }
};

export const setDataFilter = filter => {
    return {
        type: 'SET_DATA_FILTER',
        filter
    }
};