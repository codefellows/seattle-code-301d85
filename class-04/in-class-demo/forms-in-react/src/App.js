import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

let data = [0,1,2,3,4,5,6,7,8,9,10];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      howToSort: '',
      data: data
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // let name = event.target.name.value;
    // let selected = event.target.selected.value;
    let username = event.target.username.value;
    let lastname = event.target.lastName.value;
    console.log(username, lastname);
    this.setState({
      name: event.target.name.value,
      howToSort: event.target.selected.value

    });
    console.log(this.state);
  }

  handleInput = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  handleSelect = (e) => {
    let selected = e.target.value;
    console.log(selected);
    if (selected === 'even') {
      // return all the even numbers
      let newData = data.filter(num => num % 2 === 0);
      this.setState({ data: newData});
    } else if (selected === 'odd') {
      // return just the odd numbers
      let newData = data.filter(num => num % 2);
      this.setState({ data: newData});
    } else {
      // return all the numbers
      this.setState({ data: data});
    }
  }

  render () {
    
    let numbers = this.state.data.map((num, idx) => {
      return (
        <ListGroup.Item key={idx}>
          {num}
        </ListGroup.Item>
      )
    });
    return (
      <>
        <h1>Forms in React</h1>
        <main>
        {/* <p>{this.state.data}</p> */}
          <Form onSubmit={this.handleSubmit}>
            <Form.Label>Name
              <Form.Control 
                text="text" 
                name="name" 
                onInput={this.handleInput}
              />
            </Form.Label>

            <Form.Label htmlFor="userId">username</Form.Label>
            <Form.Control type="text" name="username" id="userId"/>

            <Form.Group controlId="lastName">
              <Form.Label>Your Last Name</Form.Label>
              <Form.Control type="text"/>
            </Form.Group>

            <p>Select Numbers</p>
            <Form.Group>
              <Form.Select 
                name="selected"
                onChange={this.handleSelect}
              >
                <option value="all">All</option>
                <option value="even">Even</option>
                <option value="odd">Odd</option>
              </Form.Select>
              </Form.Group>
            <button type="submit">Submit</button>
          </Form>
          <ListGroup>
            {numbers}
          </ListGroup>
        </main>
      </>
    );
  }
}

export default App;

// in vanilla HTML:
/*
          <form onSubmit={this.handleSubmit}>
            <label>Name
              <input 
                text="text" 
                name="name" 
                onInput={this.handleInput}
              />
            </label>
            <fieldset>
              <legend>Select Numbers</legend>
              <select 
                name="selected"
                onChange={this.handleSelect}
              >
                <option value="all">All</option>
                <option value="even">Even</option>
                <option value="odd">Odd</option>
              </select>
            </fieldset>
            <button type="submit">Submit</button>
          </form>

*/

/*
            <label>Label
              <input type="text"/>
            </label>
            <label for="someValue">label</label>
            <input type="text" id="someValue"/>
*/
