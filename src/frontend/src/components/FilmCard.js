import React, { Component } from 'react'
import {Button, Card} from "react-bootstrap";

/**
 * @props film, onClick()
 */
class FilmCard extends Component {

    render() {
        const film = this.props.film;
        const cardStyle = {
            minWidth: '300px',
            margin: '5px',
            border: 'solid 2px lightgrey',
            zIndex: '2',
            borderRadius: '5px',
        }
        return (
            <Card style={cardStyle} >
                <Card.Img variant="top" src={film.image} />
                <Card.Body>

                    <Card.Title>
                        {film.title}
                    </Card.Title>

                    <Card.Subtitle className="mb-2 text-muted">
                        {film.releaseDate}
                    </Card.Subtitle>

                </Card.Body>
                <Card.Footer style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <Button
                        type="button"
                        style={{width: '25%'}}
                        size="sm"
                        variant="secondary"
                        onClick={ () => this.props.onClick(film, 'view') }>
                        View
                    </Button>
                    <Button
                        type="button"
                        style={{width: '25%'}}
                        size="sm"
                        variant="secondary"
                        onClick={ () => this.props.onClick(film, 'edit') }>
                        Edit
                    </Button>
                    <Button
                        type="button"
                        style={{width: '25%'}}
                        size="sm"
                        variant="secondary"
                        onClick={ () => this.props.onClick(film, 'delete') }>
                        Delete
                    </Button>
                </Card.Footer>
            </Card>
        );
    }
}

export default FilmCard;