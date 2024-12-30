import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

class ConfirmationModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title || "Confirm Action", // if not given, is default "Confirm Action"
            message: props.message || "Are you sure you want to Submit?",
        }
    }

    render() {
        return(
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader>{this.state.title}</ModalHeader>
                <ModalBody>{this.state.message}</ModalBody>
                <ModalFooter className='justify-content-between'>
                    <Button color='primary' onClick={this.props.onSubmit}>Confirm</Button>
                    <Button color='danger' onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
} 

export default ConfirmationModal;

