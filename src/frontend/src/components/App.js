import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./Footer";
import Top from "./Top";
import Album from "./Album";
import CreateModal from "./CreateModal";
import ViewModal from "./ViewModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import {createFilm, deleteFilm, getFilms, updateFilm} from "../config/fetching";


class App extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            films: [],
            loaded: false,
            showModal: false,
        }
    }

    turnOffModal() {
        this.setState({showModal: false});
    }

    componentDidMount() {
        this.handleGet();
    }

    handleGet() {
        getFilms()
            .then(res => res.json())
            .then(json => {
                this.setState({
                    films: json,
                    loaded: true,
                })
            })
            .catch(e => console.warn(e));
    }

    handleCreate(film) {
        createFilm(film)
            .then(() => this.handleGet())
            .catch(e => console.warn(e));
        this.turnOffModal();
    }

    handleUpdate(id, film) {
        updateFilm(id, film)
            .then(() => this.handleGet())
            .catch(e => console.warn(e));
        this.turnOffModal();
    }

    handleDelete(film) {
        deleteFilm(film.id)
            .then(() => this.handleGet())
            .catch(e => console.warn(e));
        this.turnOffModal();
    }

    handleModalClick(film, method) {
        switch (method) {
            case 'create':
                this.modal = <CreateModal
                    onAccept={ (f) => this.handleCreate(f) }
                    onDecline={ () => this.turnOffModal() }/>;
                this.setState({ showModal: true });
                break;
            case 'view':
                this.modal = <ViewModal
                    film={film}
                    onDecline={ () => this.turnOffModal() }/>;
                this.setState({ showModal: true });
                break;
            case 'edit':
                this.modal = <EditModal
                    film={film}
                    onAccept={ (f) => this.handleUpdate(film.id, f) }
                    onDecline={ () => this.turnOffModal() }/>;
                this.setState({ showModal: true });
                break;
            case 'delete':
                this.modal = <DeleteModal
                    onAccept={ () => this.handleDelete(film) }
                    onDecline={ () => this.turnOffModal() }/>;
                this.setState({ showModal: true });
                break;
            default:
                console.warn('Invalid method ' + method);
        }
    }

    render() {
        return (
            <React.Fragment>
                <Top onClick={ (film, method) => this.handleModalClick(film, method)} />
                    <main>
                      <Album
                          films={this.state.films}
                          onClick={ (film, method) => this.handleModalClick(film, method) } />
                    </main>
                    <Footer />
                { this.state.showModal ? this.modal : '' }
            </React.Fragment>
        );
    }
}

export default App;
