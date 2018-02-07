import React from 'react';
import { DropTarget } from 'react-dnd';

import './Group.css';

import TaskList from '../task-list/TaskList';
import { ItemTypes } from '../../consts/consts';

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
                          replaceTask={this.props.replaceTask}
                          showDetails={this.props.showDetails} />
            </div>
        );
    }
}

const groupTarget = {
    drop(props) {
        return {
            groupId: props.id
        };
    }
};

function collect (connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

export default DropTarget(ItemTypes.TASK, groupTarget, collect)(Group);