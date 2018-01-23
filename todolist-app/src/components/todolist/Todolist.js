import React from 'react';
import './Todolist.css';

import TodolistItem from '../todolist-item/TodolistItem';

class Todolist extends React.Component{
    render() {
        const listItems = this.props.data.map((item) =>
            <TodolistItem key={item.id.toString()}
                          id={item.id}
                          title={item.title}
                          description = {item.description}
                          created_at = {item.created_at} />
        );

        return (
            <div className="todolist">
                {listItems}
            </div>
        );
    }
}

export default Todolist;

