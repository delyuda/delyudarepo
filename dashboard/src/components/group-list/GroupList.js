import React from 'react';
import './GroupList.css';
import Modal from 'react-modal';

import Group from '../group/Group';

class GroupList extends React.Component{
    constructor (props) {
        super(props);

        this.state = {
            isModalOpen: false,
            groupTitle: ''
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.groupInputChange = this.groupInputChange.bind(this);
        this.addGroup = this.addGroup.bind(this);
    }

    componentDidMount () {
        this.props.loadData();
    }

    render () {
        const groupList = this.props.data.data.map(item =>
            <Group key={item.id.toString()} {...item} />
        );

        const addGroup = (this.props.authState) ?
            (
                <div>
                <div className="add-group">
                    <button className="add-group-btn" onClick={this.openModal}>
                        Add Group
                    </button>
                </div>
                    <Modal
                        isOpen={this.state.isModalOpen}>
                        <h1>Add new group</h1>
                        <div>
                            <label htmlFor="group-name">Group Title: </label>
                            <input type='text' id="group-name" value={this.state.groupTitle}
                                   onChange={this.groupInputChange} />
                        </div>
                        <button onClick={this.addGroup}>Create Group</button>
                        <button onClick={this.closeModal}>Cancel</button>
                    </Modal>
                </div>
            ) :
            "";

        return (
            <div className="group-list">
                {groupList}
                {addGroup}
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
            isModalOpen: false
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
}

export default GroupList;