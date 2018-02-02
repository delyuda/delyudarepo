import React from 'react';
import './TaskList.css';
import Task from '../task/Task';

class TaskList extends React.Component{
    render () {
        const taskList = this.props.tasks.map( item =>
            <Task key={item.id.toString()} {...item} />
        );

        return (
            <div className="task-list">
                {taskList}
            </div>
        );
    }
}

export default TaskList;