import React, { Component } from 'react'
import {Button, Image, Modal} from "react-bootstrap";
import {getImage} from "../config/fetching";

/**
 * @props film, onDecline()
 */
class ViewModal extends Component {

    render() {
        const film = this.props.film;
        const onDecline = () => this.props.onDecline();
        return (
            <Modal
                size="lg"
                style={{wordWrap: 'break-word'}}
                show={ true }
                onHide={onDecline}>

                <Modal.Body style={{margin: 'auto'}}>
                    <Image src={film.image} fluid/>
                </Modal.Body>

                <Modal.Header>
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
                        type="button"
                        onClick={onDecline}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ViewModal;