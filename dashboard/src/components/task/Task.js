import React from 'react';
import './Task.css';

class Task extends React.Component{
    render () {
        return (
            <div className="task">
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