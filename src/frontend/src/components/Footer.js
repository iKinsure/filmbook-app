import React, { Component } from 'react'
import {Navbar} from "react-bootstrap";

class Footer extends Component {

    render() {
        return (
            <footer className="text-muted" style={{boxShadow: '0 0 50px 6px', zIndex: '1'}}>
                <Navbar bg="dark" variant="dark" className="justify-content-center">
                    <p>&copy; {new Date().getFullYear()} iKinsure</p>
                </Navbar>
            </footer>
        );
    }
}

export default Footer;