import React, { Component } from 'react'
import {Button, Modal} from "react-bootstrap";

class ViewModal extends Component {

    render() {
        const film = this.props.film;
        return (
            <Modal
                show={ true }
                onHide={ () => this.props.onDecline() }>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {film.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>{film.releaseDate}</h6>
                    <p>{film.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={ () => this.props.onDecline() }>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ViewModal;