import React, { Component } from 'react'
import {Button, Card} from "react-bootstrap";

class FilmCard extends Component {

    render() {
        const film = this.props.film;
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>
                        {film.title}
                    </Card.Title>
                    <Card.Text>
                        {film.description}
                    </Card.Text>
                    <Button variant="primary" onClick={ () => {} }>View</Button>
                    <Button variant="primary" onClick={ () => {} }>Edit</Button>
                    <Button variant="primary" onClick={ () => this.props.onDelete(film.id) }>Delete</Button>
                </Card.Body>
            </Card>
        );
    }
}

export default FilmCard;