import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import data from './data.json';
import Modal from 'react-bootstrap/Modal';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hearts: '',
      isModalDisplaying: false,
      personName: ''
    }
  }

  addHearts = () => {
    this.setState({
      hearts: this.state.hearts + '❤️'
    });
  };

  openModalHandler = (name) => {
    // console.log(name);
    this.setState({
      isModalDisplaying: true,
      personName: name
    });
  };

  closeModalHandler = () => {
    this.setState({
      isModalDisplaying: false
    });
  };

  render() {
    return (
      <>
        <Header
          hearts={this.state.hearts}
        />
        <Main
          addHearts={this.addHearts}
          data={data}
          openModalHandler={this.openModalHandler}
        />
        <footer>
      
        </footer>
        <Modal
          show={this.state.isModalDisplaying}
          onHide={this.closeModalHandler}
        >
          <Modal.Title>{this.state.personName} is an amazing member of this class</Modal.Title>
        </Modal>
      </>
    );
  }
}

export default App;
