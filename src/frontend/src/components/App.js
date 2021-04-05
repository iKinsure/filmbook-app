import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./Footer";
import Top from "./Top";
import Album from "./Album";

class App extends React.Component  {

  render() {
    return (
        <React.Fragment>
          <Top />
          <main>
            <Album />
          </main>
          <Footer />
        </React.Fragment>
    );
  }
}

export default App;
