import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./Footer";
import Top from "./Top";
import Album from "./Album";
import CreateModal from "./CreateModal";

class App extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }
    }

    handleUpload() {
        this.setState({showModal: true});
    }

    async createFilm(film) {
        await fetch('api/films', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(film),
        }).then(() => this.setState({showModal: false}));
    }

    handleCreate(film) {
        this.createFilm(film).then(r => console.log(r));
    }

    render() {
        return (
            <React.Fragment>
                <Top onClick={ () => this.handleUpload() } />
                    <main>
                      <Album />
                    </main>
                    <Footer />

                    {this.state.showModal ? <CreateModal
                    onAccept={ (f) => this.handleCreate(f) }
                    onDecline={ () => this.setState({showModal: false}) } /> : ''}

            </React.Fragment>
        );
    }
}

export default App;
