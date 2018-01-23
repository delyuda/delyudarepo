import React from 'react';
import './TodolistItem.css';

class TodolistItem extends React.Component{
    render() {
        return (
        <div className="todo-item">
            <div className="todo-item__header">
                <span className="fa fa-remove remove-icon" onClick={this.props.removeItem}></span>
            </div>
            <div className="todo-item__title">{this.props.title}</div>
            <div className="todo-item__descr">{this.props.description}</div>
            <div className="todo-item__date">Added: {this.props.created_at}</div>
        </div>
        )
    }
}

export default TodolistItem;