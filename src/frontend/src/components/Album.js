import React from "react";
import {Container, Row} from "react-bootstrap";
import FilmCard from "./FilmCard";

class Album extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            films: [],
            loaded: false,
        };
    }

    async componentDidMount() {
        await this.getFilms();
    }

    async getFilms() {
        await fetch('/api/films')
            .then(res => res.json())
            .then(json => this.setState({
                films: json,
                loaded: true,
            }));
    }

    async getFilmById(id) {

    }

    async createFilm(film) {

    }

    async updateFilm(id) {

    }

    async deleteFilm(id) {
        await fetch(`api/films/${id}`, {method: 'DELETE'})
            .then(() => this.getFilms());
    }

    render() {
        return (
            <Container>
                <Row>
                    {
                        this.state.films.map((item, key) =>
                        <FilmCard
                            key={key}
                            film={item}
                            onDelete={ (id) => this.deleteFilm(id) }
                        />)
                    }
                </Row>
            </Container>
        );
    }
}

export default Album;
