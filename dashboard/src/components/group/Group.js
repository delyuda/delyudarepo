import React from 'react';
import './Group.css';
import TaskList from '../task-list/TaskList';

class Group extends React.Component{
    render () {
        const removeBtn = (this.props.authState) ?
            (
                <div className="group__header">
                    <span className="glyphicon glyphicon-remove remove-group-btn" onClick={ () =>
                        this.props.removeGroup({id: this.props.id}) } title="Remove Group"></span>
                </div>
            ) : '';

        return (
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

export default Group;