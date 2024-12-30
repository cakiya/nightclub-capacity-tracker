import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import ConfirmationModal from './ConfirmationModal';

class FormModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmationModalOpen: false,
        }
    }

    toggleConfirmationModal = () => {
        this.setState({ confirmationModalOpen: !this.state.confirmationModalOpen });
    }

    handleSubmit = () => { // called by confirmation modal.
        this.toggleConfirmationModal();
        this.props.onSubmit();
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} unmountOnClose={false}>
                <ModalHeader>{this.props.title}</ModalHeader>
                <ModalBody>
                    {this.props.children}
                </ModalBody>
                <ModalFooter className='justify-content-between'>
                    <Button color='primary' onClick={this.toggleConfirmationModal}>Submit</Button>
                    <ConfirmationModal
                        isOpen={this.state.confirmationModalOpen}
                        toggle={this.toggleConfirmationModal}
                        onSubmit={this.handleSubmit}
                    />
                    <Button color='danger' onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default FormModal;