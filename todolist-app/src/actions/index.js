let nextItemId = 4;

export const addItem = ({title, description}) => {
    return {
        type: 'ADD_ITEM',
        id: nextItemId++,
        title,
        description
    }
};