import React, { Component } from 'react'
import {Navbar} from "react-bootstrap";

class Footer extends Component {

    render() {
        return (
            <footer className="text-muted">
                <Navbar bg="dark" variant="dark" className="justify-content-center">
                    <p>&copy; {new Date().getFullYear()} iKinsure</p>
                </Navbar>
            </footer>
        );
    }
}

export default Footer;