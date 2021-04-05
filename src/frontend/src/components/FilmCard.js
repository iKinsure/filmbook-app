import React, { Component } from 'react'
import {Button, Card} from "react-bootstrap";

class FilmCard extends Component {

    render() {
        const film = this.props.film;
        return (
            <Card style={{ minWidth: '300px', margin: '5px', border: 'solid 1px lightgrey'}} >
                <Card.Img variant="top" src="" />
                <Card.Body>

                    <Card.Title>
                        {film.title}
                    </Card.Title>

                    <Card.Subtitle className="mb-2 text-muted">
                        {film.releaseDate}
                    </Card.Subtitle>

                    <Card.Text>
                        {film.description}
                    </Card.Text>

                    <Card.Link>
                        <Button variant="primary" onClick={ () => this.props.onClick(film, 0) }>View</Button>
                    </Card.Link>
                    <Card.Link>
                        <Button variant="primary" onClick={ () => this.props.onClick(film, 1) }>Edit</Button>
                    </Card.Link>
                    <Card.Link>
                        <Button variant="primary" onClick={ () => this.props.onClick(film, 2) }>Delete</Button>
                    </Card.Link>

                </Card.Body>
            </Card>
        );
    }
}

export default FilmCard;