import React from "react";
import {CardGroup, Container} from "react-bootstrap";
import FilmCard from "./FilmCard";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import ViewModal from "./ViewModal";

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
            }));
    }

    async getFilmById(id) {

    }

    async updateFilm(id, film) {
        await fetch(`api/films/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(film),
        }).then(() => this.getFilms());
    }

    async deleteFilm(id) {
        await fetch(`api/films/${id}`, {method: 'DELETE'})
            .then(() => this.getFilms());
    }

    handleUpdate(id, film) {
        this.updateFilm(id, film).then(r => this.setState({showModal: false}));
    }

    handleDelete(film) {
        this.deleteFilm(film.id).then(r => this.setState({showModal: false}));
    }

    handleCardClick(film, method) {
        switch (method) {
            case 'view':
                this.modal = <ViewModal
                    film={film}
                    onDecline={ () => this.setState({showModal: false}) }/>
                this.setState({ showModal: true });
                break;
            case 'edit':
                this.modal = <EditModal
                    film={film}
                    onAccept={ (f) => this.handleUpdate(film.id, f) }
                    onDecline={ () => this.setState({showModal: false}) }/>
                this.setState({ showModal: true });
                break;
            case 'delete':
                this.modal = <DeleteModal
                    onAccept={ () => this.handleDelete(film) }
                    onDecline={ () => this.setState({showModal: false}) }/>
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

                { this.state.showModal ? this.modal : '' }

            </React.Fragment>
        );
    }
}



export default Album;
