import React from 'react';
import './Group.css';
import TaskList from '../task-list/TaskList';

class Group extends React.Component{
    render () {
        return (
            <div className="group">
                <div className="group__title">
                    {this.props.title}
                </div>
                <TaskList tasks={this.props.tasks}/>
            </div>
        );
    }
}

export default Group;