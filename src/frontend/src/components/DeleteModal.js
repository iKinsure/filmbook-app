import React, { Component } from 'react'
import {Button, Modal} from "react-bootstrap";

/**
 * @props onDecline(), onAccept()
 */
class DeleteModal extends Component {

    render() {
        return (
            <Modal
                show={ true }
                onHide={ () => this.props.onDecline() }>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Confirm delete
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete film?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={ () => this.props.onDecline() }>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={ () => this.props.onAccept() }>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default DeleteModal;