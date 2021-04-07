import React, { Component } from 'react'
import {Button, Form, Modal} from "react-bootstrap";

/**
 * @props onAccept(), onDecline(), film
 */
class EditModal extends Component {

    constructor(props) {
        super(props);
        const film = this.props.film;
        this.state = {
            validated: false,
            film: {
                title: film.title,
                releaseDate: film.releaseDate,
                description: film.description,
            },
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (event.currentTarget.checkValidity() === false) {
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
        const onDecline = () => this.props.onDecline();
        const onSubmit = event => this.handleSubmit(event);
        const onChange = event => this.handleChange(event);
        return (

            <Modal
                backdrop="static"
                show={ true }
                onHide={onDecline}>

                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit film
                    </Modal.Title>
                </Modal.Header>

                <Form
                    id="edit-form"
                    validated={this.state.validated}
                    onSubmit={onSubmit}>

                    <Modal.Body>

                        <Form.Group controlId="title">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={film.title}
                                value={this.state.film.title}
                                onChange={onChange} />
                        </Form.Group>

                        <Form.Group controlId="releaseDate">
                            <Form.Label>Release date:</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder={film.releaseDate}
                                value={this.state.film.releaseDate}
                                onChange={onChange} />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description: </Form.Label>
                            <Form.Control
                                as="textarea" rows={3}
                                placeholder={film.description}
                                value={this.state.film.description}
                                onChange={onChange} />
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Image:</Form.Label>
                            <Form.File
                                disabled={true}
                            />
                        </Form.Group>

                        <Form.Text className="text-muted">
                            Leave field empty if no change
                        </Form.Text>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={onDecline}>
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