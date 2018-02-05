import React from 'react';
import Modal from 'react-modal';

class TaskDetails extends React.Component{
    render () {
        return (
            <Modal appElement={document.getElementById('root')}
                   isOpen={this.props.isOpen}>
                <div className="task-details__title">
                    {this.props.title}
                </div>
                <div className="task-details__description">
                    {this.props.description}
                </div>
                <div className="task-details__date">
                    Due To:
                    {this.props.date}
                </div>
                <button onClick={this.props.closeModal}>Close</button>
            </Modal>
        );
    }
}

export default TaskDetails;