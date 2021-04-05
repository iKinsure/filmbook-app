import React from "react";
import {CardGroup, Container} from "react-bootstrap";
import FilmCard from "./FilmCard";

/**
 * @props films, onClick()
 */
class Album extends React.Component {

    render() {
        return (
            <Container>
                <CardGroup>
                    { this.props.films.map((item, key) =>
                            <FilmCard
                                key={ key }
                                film={ item }
                                onClick={ this.props.onClick }
                            />)
                    }
                </CardGroup>
            </Container>
        );
    }
}



export default Album;
