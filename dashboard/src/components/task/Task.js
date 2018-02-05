import React from 'react';
import './Task.css';

class Task extends React.Component{
    constructor (props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);
    }

    render () {
        const removeTool = (this.props.authState) ?
            (
                <div className="task__header">
                    <span className="glyphicon glyphicon-remove remove-task-btn" onClick={() => {
                        this.props.removeTask(this.props.id)
                    }} title="Remove Task"></span>
                </div>
            ) : '';

        return (
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


export default Task;