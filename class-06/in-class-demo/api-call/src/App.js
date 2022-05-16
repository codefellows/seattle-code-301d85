import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swData: [],
      city: '',
      error: false
    }
  }

  handleStarWars = async (e) => {
    e.preventDefault();
    try {
      // make the request to the Star Wars API
      let swcharacters = await axios.get('https://swapi.dev/api/people/?page=1');
      // Proof of life
      // console.log(swcharacters.data.results);
      // Put the data in state
      this.setState({
        swData: swcharacters.data.results,
        error: false,
      });
    } catch (error) {
      console.log('error: ', error);
      console.log('error message: ', error.message);
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }

  handleCitySubmit = async (e) => {
    e.preventDefault();
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.city}&format=json`;
    console.log(this.state.city);
    console.log(url);
    let cityInfo = await axios.get(url);
    console.log(cityInfo.data[0]);
  }

  cityChange = (e) => {
    this.setState({
      city: e.target.value
    });
  }

  render() {
    // console.log(process.env.REACT_APP_LOCATION_API_KEY);
    // console.log(this.state.swData);
    let swlistChar = this.state.swData.map((char, idx) => {
      return <li key={idx}>{char.name}</li>
    });

    // example of a map url:
    // `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=47.6038321,-122.3300624&zoom=12`

    return (
      <>
        <h1>Data from an API</h1>
        <form onSubmit={this.handleStarWars}>
          <button>Display Star Wars data</button>
        </form>
        {/* Render the star wars data on the page */}
        {this.state.error
          ?
          <p>{this.state.errorMessage}</p>
          :
          ( <ul>
            {swlistChar}
          </ul> )
        }
        <form onSubmit={this.handleCitySubmit}>
          <label htmlFor="cityName">Pick a City</label>
          <input type="text" id="cityName" onChange={this.cityChange} />
          <button type="submit">Get City Data</button>
        </form>
      </>
    );
  }
}

export default App;
