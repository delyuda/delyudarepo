import React from 'react';
import './TaskList.css';
import Modal from 'react-modal';

import Task from '../task/Task';

class TaskList extends React.Component{
    constructor (props) {
        super(props);

        this.state = {
            isModalOpen: false,
            isTaskUpdate: false,
            taskTitle: '',
            taskDescription: '',
            taskDate: '',
            taskId: null
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onChangeTask = this.onChangeTask.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.addTaskHandler = this.addTaskHandler.bind(this);
        this.updateTaskHandler = this.updateTaskHandler.bind(this);
        this.updateTask = this.updateTask.bind(this);
    }

    render () {
        const taskList = this.props.tasks.map( item =>
            <Task key={item.id.toString()} {...item}
                authState={this.props.authState}
                removeTask={this.props.removeTask}
                showDetails={this.props.showDetails}
                updateTask={this.updateTaskHandler} />
        );

        const addTask = (this.props.authState) ?
            (
                <div>
                    <div className="add-task">
                        <div onClick={this.openModal} className="add-task-btn" title="Add New Task">
                            <span className="glyphicon glyphicon-plus"></span>
                            Add Task
                        </div>
                    </div>
                    <Modal appElement={document.getElementById('root')}
                           isOpen={this.state.isModalOpen}
                           onRequestClose={this.closeModal}
                           style={{
                               content: {
                                   width: '450px',
                                   height: '360px',
                                   margin: 'auto auto',
                                   padding: '40px 10px 0'
                               }
                           }}>
                        <div className="new-task-header">
                            Add New Task
                        </div>
                        <div className="from-group">
                            <label htmlFor="task-title">
                                Title
                            </label>
                            <input type="text" id="task-title" className="form-control"
                                   value={this.state.taskTitle}
                                onChange={this.onChangeTask} />
                        </div>
                        <div className="from-group">
                            <label htmlFor="task-descr">
                                Description:
                            </label>
                            <textarea id="task-descr" className="form-control task-description"
                                      value={this.state.taskDescription}
                                      onChange={this.onChangeDescription}>
                                Description here
                            </textarea>
                        </div>
                        <div className="from-group">
                            <label htmlFor="task-date">
                                Due Date:
                            </label>
                            <input type="text" id="task-date" className="form-control"
                                   value={this.state.taskDate}
                                   onChange={this.onChangeDate} />
                        </div>
                        <div className="btn-toolbar">
                            {
                                this.state.isTaskUpdate ?
                                <button className="btn btn-success" onClick={this.updateTask}>
                                    Update Task
                                </button>:
                                <button className="btn btn-success" onClick={this.addTaskHandler}>
                                    Create Task
                                </button>
                            }
                            <button className="btn btn-default" onClick={this.closeModal}>
                                Cancel
                            </button>
                        </div>
                    </Modal>
                </div>
            ) : '';

        return (
            <div className="task-list">
                {taskList}
                {addTask}
            </div>
        );
    }

    openModal ({isTaskUpdate = false, title = '', description = '', date = '', id = null}) {
        this.setState({
            isModalOpen: true,
            isTaskUpdate: isTaskUpdate,
            taskTitle: title,
            taskDescription: description,
            taskDate: date,
            taskId: id
        });
    }

    closeModal () {
        this.setState({
            isModalOpen: false,
            isTaskUpdate: false,
            taskTitle: '',
            taskDescription: '',
            taskDate: '',
            taskId: null
        });
    }

    onChangeTask (e) {
        this.setState({
            taskTitle: e.target.value
        });
    }

    onChangeDescription (e) {
        this.setState({
            taskDescription: e.target.value
        });
    }

    onChangeDate (e) {
        this.setState({
            taskDate: e.target.value
        });
    }

    addTaskHandler () {
        this.props.addTask({
            groupId: this.props.groupId,
            title: this.state.taskTitle,
            description: this.state.taskDescription,
            date: this.state.taskDate
        });

        this.closeModal();
    }

    updateTaskHandler ({id, title, description, date}) {
        this.openModal({
            isTaskUpdate: true,
            title,
            description,
            date,
            id
        });
    }

    updateTask () {
        this.props.updateTask({
            id: this.state.taskId,
            title: this.state.taskTitle,
            description: this.state.taskDescription,
            date: this.state.taskDate
        });

        this.closeModal();
    }
}

export default TaskList;