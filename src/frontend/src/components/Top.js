import React, { Component } from 'react'
import {Nav, Navbar} from "react-bootstrap";

/**
 * @props onClick()
 */
class Top extends Component {

    render() {
        return (
            <Navbar bg="dark" variant="dark" style={{boxShadow: '0 0 50px 6px', zIndex: '1'}}>

                <Navbar.Brand>
                    <svg style={{ marginBottom: '4px' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-film" viewBox="0 0 16 16">
                        <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/>
                    </svg>
                </Navbar.Brand>

                <Navbar.Brand>
                    Filmbook
                </Navbar.Brand>

                <Nav className="mr-auto">
                    <Nav.Link onClick={ () => this.props.onClick('', 'create') } >
                        Upload
                    </Nav.Link>
                </Nav>

            </Navbar>
        );
    }
}

export default Top;