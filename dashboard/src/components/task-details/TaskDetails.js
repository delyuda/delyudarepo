import React from 'react';
import Modal from 'react-modal';
import './TaskDetails.css';

class TaskDetails extends React.Component{
    render () {
        return (
            <Modal appElement={document.getElementById('root')}
                   isOpen={this.props.isOpen}
                   style={{
                       content: {
                           width: '500px',
                           height: '400px',
                           margin: 'auto auto',
                           padding: '40px 10px 0'
                       }
                   }} >
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
                <button onClick={this.props.closeModal} className="btn btn-default close-btn">
                    Close
                </button>
            </Modal>
        );
    }
}

export default TaskDetails;