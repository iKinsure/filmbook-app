import React, { Component } from 'react'
import {Button, Form, Modal} from "react-bootstrap";

class EditModal extends Component {


    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            film: {},
        }
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.setState({validated: true});
        this.props.onAccept(this.state.film);
    }

    handleChange(event) {
        const film = this.state.film;
        film[event.target.id] = event.target.value;
        this.setState({film: film});
    }

    render() {
        const film = this.props.film;
        return (

            <Modal
                show={ true }
                onHide={ () => this.props.onDecline() }>

                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit film
                    </Modal.Title>
                </Modal.Header>

                <Form validated={this.state.validated} onSubmit={(event) => this.handleSubmit(event)}>

                    <Modal.Body>

                        <Form.Group controlId="title">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={film.title}
                                value={this.state.film.title}
                                onChange={(event) => this.handleChange(event)} />
                        </Form.Group>

                        <Form.Group controlId="releaseDate">
                            <Form.Label>Release date:</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder={film.releaseDate}
                                value={this.state.film.releaseDate}
                                onChange={(event) => this.handleChange(event)} />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description: </Form.Label>
                            <Form.Control
                                as="textarea" rows={3}
                                placeholder={film.description}
                                value={this.state.film.description}
                                onChange={(event) => this.handleChange(event)} />
                        </Form.Group>

                        <Form.Text className="text-muted">
                            Leave field empty if no change
                        </Form.Text>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={ () => this.props.onDecline() }>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            type="submit" >
                            Save
                        </Button>
                    </Modal.Footer>

                </Form>

            </Modal>
        );
    }
}

export default EditModal;