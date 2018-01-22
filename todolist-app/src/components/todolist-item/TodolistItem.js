import React from 'react';
import './TodolistItem.css';

class TodolistItem extends React.Component{
    render() {
        return (
        <div class="todo-item">
            <div class="todo-item__header">
                <span class="fa fa-remove"></span>
            </div>
            <div class="todo-item__title">{this.props.title}</div>
            <div class="todo-item__descr">{this.props.description}</div>
            <div class="todo-item__date">Added: {this.props.created_at}</div>
        </div>
        )
    }
}

export default TodolistItem;