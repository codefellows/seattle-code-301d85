import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      petData: {},
      species: '',
      showPet: false
    }
  }

  handleInput = e => {
    this.setState({
      species: e.target.value
    });
  };

  handlePet = async (e) => {
    e.preventDefault();
    let url = `${process.env.REACT_APP_SERVER}/pets?species=${this.state.species}`;
    console.log(url);
    let pet = await axios.get(url);
    console.log(pet.data);
    this.setState({
      petData: pet.data,
      showPet: true
    });
  }

  render() {
    return (
      <>
        <h1>Find Your Pet</h1>
        <form onSubmit={this.handlePet}>
          <label>Search
            <input type="text" onInput={this.handleInput}/>
          </label>
          <button type="submit">Display Pet</button>
        </form>
        {
          this.state.showPet  &&
          <p>{this.state.petData.name}</p>
        }
      </>
    );
  }
}

export default App;
