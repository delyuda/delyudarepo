import React from 'react';
import PropTypes from 'prop-types';
import './Todolist.css';

import TodolistItem from '../todolist-item/TodolistItem';

class Todolist extends React.Component{
    render() {
        const listItems = this.props.data.map((item) =>
            <TodolistItem key={item.id.toString()} {...item} removeItem={() => this.props.removeItem(item.id)} />
        );

        return (
            <div className="todolist">
                {listItems}
            </div>
        );
    }
}

Todolist.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    removeItem: PropTypes.func.isRequired
};


export default Todolist;

