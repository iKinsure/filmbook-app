import React, { Component } from 'react'
import {Button, Form, Modal} from "react-bootstrap";

/**
 * @props onDecline(), onAccept()
 */
class CreateModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            film: {
                title: '',
                releaseDate: '',
                description: '',
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
        const onDecline = () => this.props.onDecline();
        const onChange = event => this.handleChange(event);
        const onSubmit = event => this.handleSubmit(event);
        return (
            <Modal
                backdrop="static"
                show={ true }
                onHide={onDecline}>

                <Modal.Header closeButton>
                    <Modal.Title>
                        Create film
                    </Modal.Title>
                </Modal.Header>

                <Form
                    id="create-form"
                    validated={this.state.validated}
                    onSubmit={onSubmit}>

                    <Modal.Body>

                        <Form.Group controlId="title">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder={''}
                                value={this.state.film.title}
                                onChange={onChange} />
                        </Form.Group>

                        <Form.Group controlId="releaseDate">
                            <Form.Label>Release date:</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                placeholder={''}
                                value={this.state.film.releaseDate}
                                onChange={onChange} />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description: </Form.Label>
                            <Form.Control
                                required
                                as="textarea" rows={3}
                                placeholder={''}
                                value={this.state.film.description}
                                onChange={onChange} />
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Image:</Form.Label>
                            <Form.File
                                required
                                disabled={true}
                            />
                        </Form.Group>

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

export default CreateModal;