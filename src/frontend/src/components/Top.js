import React, { Component } from 'react'
import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import CreateModal from "./CreateModal";

class Top extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }
    }

    handleUpload() {
        this.setState({showModal: true});
    }

    async createFilm(film) {
        await fetch('api/films', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(film),
        }).then(() => this.setState({showModal: false}));
    }

    handleCreate(film) {
        this.createFilm(film).then(r => console.log(r));
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                    <svg style={{ marginBottom: '4px' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-film" viewBox="0 0 16 16">
                        <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/>
                    </svg>
                </Navbar.Brand>
                <Navbar.Brand>Filmbook</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link onClick={ () => this.handleUpload() } >Upload</Nav.Link>
                </Nav>


                {this.state.showModal ? <CreateModal
                    onAccept={ (f) => this.handleCreate(f) }
                    onDecline={ () => this.setState({showModal: false}) } /> : ''}

            </Navbar>
        );
    }
}

export default Top;