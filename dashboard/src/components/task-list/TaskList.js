import React from 'react';
import './TaskList.css';
import Modal from 'react-modal';

import Task from '../task/Task';

class TaskList extends React.Component{
    constructor (props) {
        super(props);

        this.state = {
            isModalOpen: false,
            taskTitle: '',
            taskDescription: '',
            taskDate: ''
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onChangeTask = this.onChangeTask.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.addTaskHandler = this.addTaskHandler.bind(this);
    }

    render () {
        const taskList = this.props.tasks.map( item =>
            <Task key={item.id.toString()} {...item}
                authState={this.props.authState}
                removeTask={this.props.removeTask} />
        );

        const addTask = (this.props.authState) ?
            (
                <div>
                    <div className="add-task">
                        <button onClick={this.openModal}>Add Task</button>
                    </div>
                    <Modal isOpen={this.state.isModalOpen}>
                        <div className="">
                            <label htmlFor="task-title">
                                Title
                            </label>
                            <input type="text" id="task-title" value={this.state.taskTitle}
                                onChange={this.onChangeTask} />
                        </div>
                        <div className="">
                            <label htmlFor="task-descr">
                                Description
                            </label>
                            <textarea id="task-descr" value={this.state.taskDescription}
                                onChange={this.onChangeDescription}>Description here</textarea>
                        </div>
                        <div className="">
                            <label htmlFor="task-date">
                                Due Date
                            </label>
                            <input type="text" id="task-date" value={this.state.taskDate}
                                onChange={this.onChangeDate} />
                        </div>
                        <button onClick={this.addTaskHandler}>Create Task</button>
                        <button onClick={this.closeModal}>Cancel</button>
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

    openModal () {
        this.setState({
            isModalOpen: true
        });
    }

    closeModal () {
        this.setState({
            isModalOpen: false,
            taskTitle: '',
            taskDescription: '',
            taskDate: ''
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
}

export default TaskList;