import React from 'react';
import { DragSource } from 'react-dnd';
import './Task.css';
import { ItemTypes } from '../../consts/consts';

class Task extends React.Component{
    constructor (props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);
    }

    render () {
        const { connectDragSource } = this.props;

        const removeTool = (this.props.authState) ?
            (
                <div className="task__header">
                    <span className="glyphicon glyphicon-remove remove-task-btn" onClick={() => {
                        this.props.removeTask(this.props.id)
                    }} title="Remove Task"></span>
                </div>
            ) : '';

        return connectDragSource(
            <div className="task" onClick={this.clickHandler} title={this.props.title}>
                {removeTool}
                <div className="task__title">
                    {this.props.title}
                </div>
                <div className="task__date">
                    Due To: {this.props.date}
                </div>
            </div>
        );
    }

    clickHandler () {
        this.props.showDetails({
            title: this.props.title,
            description: this.props.description,
            date: this.props.date
        });
    }
}

const taskSource = {
    beginDrag(props) {
        return {
            id: props.id
        }
    },

    endDrag(props, monitor) {
        let res = monitor.getDropResult();

        if (res && res.groupId) {
            props.replaceTask({
                taskId: props.id,
                groupId: res.groupId
            });
        }
    }
};


function collect (connect, monitor) {
    return {
        connectDragSource: connect.dragSource()
    }
}

export default DragSource(ItemTypes.TASK, taskSource, collect)(Task);