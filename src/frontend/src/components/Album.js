import React from "react";
import {Button, CardDeck, CardGroup, Container, Modal, Row} from "react-bootstrap";
import FilmCard from "./FilmCard";

class Album extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            films: [],
            loaded: false,
            showModal: false,
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
                film: undefined,
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

    handleDelete(film) {
        this.deleteFilm(film.id).then(r => this.setState({showModal: false}));
    }

    createModal(modal) {
        return (
            <Modal
                show={ this.state.showModal }
                onHide={ () => this.setState({showModal: false}) }>
                <Modal.Header closeButton>
                    <Modal.Title>{ modal.title }</Modal.Title>
                </Modal.Header>
                <Modal.Body>{ modal.body }</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={ () => this.setState({showModal: false}) }>
                        { modal.leftButton }
                    </Button>
                    <Button
                        variant="primary"
                        onClick={ () => this.handleDelete(this.film) }>
                        { modal.rightButton }
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    handleCardClick(film, method) {
        switch (method) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                this.film = film;
                this.setState({ showModal: true });
                break;
            default:
                console.warn('Invalid method" ' + method);
        }
    }

    render() {
        return (
            <React.Fragment>

                <Container>
                    <CardGroup>
                        {
                            this.state.films.map((item, key) =>
                                <FilmCard
                                    key={key}
                                    film={item}
                                    onClick={ (film, method) => this.handleCardClick(film, method) }
                                />)
                        }
                    </CardGroup>
                </Container>

                { this.state.showModal ? this.createModal(deleteModal) : '' }

            </React.Fragment>
        );
    }
}

const deleteModal = {
    title: 'Confirm delete',
    body: 'Are you sure you want to delete film?',
    leftButton: 'Close',
    rightButton: 'Delete',
};

export default Album;
