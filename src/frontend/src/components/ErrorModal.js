import React, { Component } from 'react'
import {Alert, Button, Modal} from "react-bootstrap";

/**
 * @props onDecline(), body
 */
class ErrorModal extends Component {

    render() {
        const decline = () => this.props.onDecline();
        return (
            <Modal show onHide={decline} >
                <Alert variant="danger" onClose={decline} style={{marginBottom: '0'}} >
                    <Alert.Heading>Error occurred!</Alert.Heading>
                    <p>
                        {this.props.body}
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={decline} variant="danger">
                            Close
                        </Button>
                    </div>
                </Alert>
            </Modal>
        );
    }
}

export default ErrorModal;