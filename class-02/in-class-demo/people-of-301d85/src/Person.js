import React from 'react';
import Button from 'react-bootstrap/Button';
import './Person.css';

class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waves: 0,
      fun: true,
      role: 'student',
      personNeedsHelp: false
    }
  }

  greetPerson = () => {
    this.setState({
      waves: this.state.waves + 1,
    });
  };

  iNeedHelp = () => {
    this.setState({
      personNeedsHelp: true
    });
  };

  iGotHelp = () => {
    this.setState({
      personNeedsHelp: false
    })
  }

  render() {
    // console.log(this.props.idx)
    return (
      <article>
        <h3>{this.props.name}</h3>
        <p>👋 {this.state.waves} greetings</p>
        <p onClick={this.greetPerson}>Say Hello!</p>
        <img
          src={this.props.imgURL}
          alt={this.props.name}
          title={this.props.name}
        />
        <div>{this.state.personNeedsHelp ? 'I need help' : ''}</div>
        <Button
          className='article-button'
          onClick={this.iNeedHelp}
        >
          Help!
        </Button>
        <Button
          className='article-button'
          variant="success"
          onClick={this.iGotHelp}
        >
          I got help
        </Button>
      </article>
    )
  }
}
export default Person;
