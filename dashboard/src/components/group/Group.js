import React from 'react';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

import './Group.css';


import TaskList from '../task-list/TaskList';
import { ItemTypes, taskHeight, titleHeight } from '../../consts/consts';

class Group extends React.Component{
    render () {
        const { connectDropTarget } = this.props;

        const removeBtn = (this.props.authState) ?
            (
                <div className="group__header">
                    <span className="glyphicon glyphicon-remove remove-group-btn" onClick={ () =>
                        this.props.removeGroup({id: this.props.id}) } title="Remove Group"></span>
                </div>
            ) : '';

        return connectDropTarget(
            <div className="group">
                {removeBtn}
                <div className="group__title">
                    {this.props.title}
                </div>
                <TaskList tasks={this.props.tasks}
                          authState={this.props.authState}
                          groupId={this.props.id}
                          addTask={this.props.addTask}
                          removeTask={this.props.removeTask}
                          showDetails={this.props.showDetails} />
            </div>
        );
    }
}

const groupTarget = {
    drop(props, monitor, component) {
        const componentRect = findDOMNode(component).getBoundingClientRect();
        const top = componentRect.top + titleHeight - taskHeight/2;

        const offset= monitor.getSourceClientOffset();
        const yPos = offset.y - top;
        const itemPos = Math.floor(yPos/taskHeight);
        let posIndex = (itemPos < props.tasks.length) ? itemPos : props.tasks.length;

        const item = monitor.getItem();

        props.replaceTask({
            groupId: props.id,
            taskId: item.id,
            posIndex
        });
    }
};

function collect (connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

export default DropTarget(ItemTypes.TASK, groupTarget, collect)(Group);