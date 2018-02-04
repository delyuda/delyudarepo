import React from 'react';
import './Task.css';

class Task extends React.Component{
    render () {
        const removeTool = (this.props.authState) ?
            (
                <div className="task__header">
                    <span className="remove-task-btn" onClick={() => {
                        this.props.removeTask(this.props.id)
                    }}>x</span>
                </div>
            ) : '';

        return (
            <div className="task">
                {removeTool}
                <div className="task__title">
                    {this.props.title}
                </div>
                <div className="task__date">
                    {this.props.date}
                </div>
            </div>
        );
    }
}


export default Task;