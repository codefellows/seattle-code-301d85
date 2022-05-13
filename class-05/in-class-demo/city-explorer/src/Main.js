import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // this.setState({
    //   city: e.target.city.value
    // });
    console.log(this.state.city);
  };

  handleCity = (e) => {
    this.setState({
      city: e.target.value
    });
  }

  render() {
    return (
      <main>
        <h2>Let's explore {this.state.city}</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="cityName">Pick a City</label>
          <input 
            type="text" 
            id="cityName" 
            name="city"
            onInput={this.handleCity}
          />
          <button type="submit">Let's go</button>
        </form>
      </main>
    );
  }
}

export default Main;
