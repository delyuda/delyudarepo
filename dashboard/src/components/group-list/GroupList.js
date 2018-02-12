import React from 'react';
import './GroupList.css';
import Modal from 'react-modal';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Group from '../group/Group';
import TaskDetails from '../task-details/TaskDetails';
import LoginModal from '../login-modal/LoginModal';

class GroupList extends React.Component{
    constructor (props) {
        super(props);

        this.state = {
            isModalOpen: false,
            groupTitle: '',
            groupId: null,
            isGroupUpdate: false,
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
        this.closeLoginModal = this.closeLoginModal.bind(this);
        this.updateGroupHandler = this.updateGroupHandler.bind(this);
        this.updateGroup = this.updateGroup.bind(this);
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
                   replaceTask={this.props.replaceTask}
                   showDetails={this.showDetails}
                   updateGroup={this.updateGroupHandler}/>
        );

        const content = (this.props.authState) ?
            (
                <div>
                    <div className="add-group">
                        <div className="add-group-btn" onClick={this.openModal} title="Add New Group">
                            <span className="glyphicon glyphicon-plus"></span>
                            <div>Add Group</div>
                        </div>
                    </div>

                    <Modal appElement={document.getElementById('root')}
                           isOpen={this.state.isModalOpen}
                           onRequestClose={this.closeModal}
                           style={{
                               content: {
                                   width: '350px',
                                   height: '200px',
                                   margin: 'auto auto',
                                   padding: '40px 10px 0'
                               }
                           }}>
                        <div className="new-group-title">Add new group</div>
                        <div className="form-group">
                            <label htmlFor="group-name">Group Title: </label>
                            <input type='text' id="group-name" className="form-control"
                                   value={this.state.groupTitle}
                                   onChange={this.groupInputChange} />
                        </div>
                        <div className="btn-toolbar">
                            {this.state.isGroupUpdate ?
                                <button className="btn btn-success" onClick={this.updateGroup}>
                                    Update Group
                                </button> :
                                <button className="btn btn-success" onClick={this.addGroup}>
                                    Create Group
                                </button>
                            }
                            <button className="btn btn-default" onClick={this.closeModal}>
                                Cancel
                            </button>
                        </div>
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
                            onRequestClose={this.closeLoginModal}
                            login={this.login}
                            close={this.closeLoginModal} />
            );

        return (
            <div className="group-list">
                {groupList}
                {content}
            </div>
        );
    }

    openModal ({isGroupUpdate = false, groupTitle = '', groupId = null}) {
        this.setState({
            isModalOpen: true,
            isGroupUpdate,
            groupTitle,
            groupId
        });
    }

    closeModal () {
        this.setState({
            isModalOpen: false,
            groupTitle: '',
            isGroupUpdate: false,
            groupId: null
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

    updateGroupHandler ({id, title}) {
        this.openModal({
            isGroupUpdate: true,
            groupTitle: title,
            groupId: id
        });
    }

    updateGroup () {
        this.props.updateGroup({
            title: this.state.groupTitle,
            id: this.state.groupId
        });

        this.closeModal();
    }
}

export default DragDropContext(HTML5Backend)(GroupList);