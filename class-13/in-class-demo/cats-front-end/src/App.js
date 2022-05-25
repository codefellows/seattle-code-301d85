import React from 'react';
import axios from 'axios';
import Cats from './Cats';
import { Button, Container, Form } from 'react-bootstrap';
import './App.css';

let SERVER = process.env.REACT_APP_SERVER;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cats: []
    }
  }

  getCats = async () => {
    try {
      let url = `${SERVER}/cats`
      // let urlWithParams = `${SERVER}/cats?location=Seattle`;
      let results = await axios.get(url);

      this.setState({
        cats: results.data
      })
    } catch(error){
      console.log('we have an error: ', error.response.data)
    }
  }

  postCat = async (cat) => {
    try {
      let url = `${SERVER}/cats`
      let createdCat = await axios.post(url, cat);
      console.log(createdCat.data);
      this.setState({
        cats: [...this.state.cats, createdCat.data]
      });
    } catch(error) {
      console.log('We have an error: ', error.respose.data);
    }
  }

  deleteCat = async (id) => {
    try {
      // validation?
      let url = `${SERVER}/cats/${id}`;
      await axios.delete(url);
      let updatedCats = this.state.cats.filter(cat => cat._id !== id);
      this.setState({
        cats: updatedCats
      });
    } catch(error) {
      console.log('We have an error: ', error.respose.data);
    }
  }

  handleCatSubmit = (e) => {
    e.preventDefault();
    let cat = {
      name: e.target.name.value,
      location: e.target.location.value,
      color: e.target.color.value,
      // this is how we get the value from a checkbox:
      spayNeuter: e.target.spayNeuter.checked
    }
    this.postCat(cat);
  }

  updateCat = async (catToUpdate) => {
    try {
      let updatedCat = await axios.put(`${SERVER}/cats/${catToUpdate._id}`, catToUpdate);
      let newCatsArray = this.state.cats.map(existingCat => {
        return existingCat._id === catToUpdate._id
          ? updatedCat.data
          : existingCat
      });
      this.setState({
        cats: newCatsArray
      });
    } catch(error) {
      console.log('We have an error: ', error.respose.data);
    }
  }


  // net effect: when the component loads it has all it needs. the data will be put in state and render
  componentDidMount() {
    this.getCats();
  }


  render() {

    return (
      <>
        <header>
          <h1>Cool Cats</h1>
        </header>
        <main>
        {
          this.state.cats.length > 0 &&
          <>
            <Cats 
              cats={this.state.cats} 
              deleteCat={this.deleteCat}
              updateCat={this.updateCat}
            />
          </>
        }
        <Container className="mt-5">
            <Form onSubmit={this.handleCatSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="color">
                <Form.Label>Color</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="spayNeuter">
                <Form.Check type="checkbox" label="spay-neuter" />
              </Form.Group>
              <Button type="submit">Add Cat</Button>
            </Form>
          </Container>
        </main>
      </>
    );
  }
}

export default App;
