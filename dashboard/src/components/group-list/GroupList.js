import React from 'react';
import './GroupList.css';
import Modal from 'react-modal';

import Group from '../group/Group';
import TaskDetails from '../task-details/TaskDetails';
import LoginModal from '../login-modal/LoginModal';

class GroupList extends React.Component{
    constructor (props) {
        super(props);

        this.state = {
            isModalOpen: false,
            groupTitle: '',
            isDetailsModalOpen: false,
            details: {
                title: '',
                description: '',
                date: ''
            },
            isLoginModalOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.groupInputChange = this.groupInputChange.bind(this);
        this.addGroup = this.addGroup.bind(this);
        this.showDetails = this.showDetails.bind(this);
        this.hideDetails = this.hideDetails.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount () {
        this.props.loadData();
    }

    render () {
        const groupList = this.props.data.data.map(item =>
            <Group key={item.id.toString()} {...item}
                   authState={this.props.authState}
                   removeGroup={this.props.removeGroup}
                   addTask={this.props.addTask}
                   removeTask={this.props.removeTask}
                   showDetails={this.showDetails}/>
        );

        const content = (this.props.authState) ?
            (
                <div>
                    <div className="add-group">
                        <button className="add-group-btn" onClick={this.openModal}>
                            Add Group
                        </button>
                    </div>

                    <Modal isOpen={this.state.isModalOpen}>
                        <h1>Add new group</h1>
                        <div>
                            <label htmlFor="group-name">Group Title: </label>
                            <input type='text' id="group-name" value={this.state.groupTitle}
                                   onChange={this.groupInputChange} />
                        </div>
                        <button onClick={this.addGroup}>Create Group</button>
                        <button onClick={this.closeModal}>Cancel</button>
                    </Modal>

                    <TaskDetails isOpen={this.state.isDetailsModalOpen}
                                 title={this.state.details.title}
                                 description={this.state.details.description}
                                 date={this.state.details.date}
                                 closeModal={this.hideDetails} />
                </div>
            ) :
            (
                <LoginModal isOpen={this.state.isLoginModalOpen}
                            login={this.login} />
            );

        return (
            <div className="group-list">
                {groupList}
                {content}
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
            groupTitle: ''
        });
    }

    groupInputChange (e) {
        this.setState({
            groupTitle: e.target.value
        });
    }

    addGroup () {
        this.props.addGroup({
            title: this.state.groupTitle
        });

        this.closeModal();
    }

    showDetails ({title, description, date}) {
        if (this.props.authState) {
            this.setState({
                details: {
                    title: title,
                    description: description,
                    date: date
                },
                isDetailsModalOpen: true
            })
        } else {
            this.openLoginModal();
        }
    }

    hideDetails () {
        this.setState({
            isDetailsModalOpen: false
        });
    }

    openLoginModal () {
        this.setState({
            isLoginModalOpen: true
        });
    }

    closeLoginModal () {
        this.setState({
            isLoginModalOpen: false
        });
    }

    login () {
        this.props.changeAuthState();
        this.closeLoginModal();
    }
}

export default GroupList;