import React from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';
import UpdateCatForm from './UpdateCatForm';

class Cats extends React.Component {
  // something in state?
  render() {
    let cats = this.props.cats.map(cat => (
      <Cat
        key={cat._id}
        cat={cat}
        deleteCat={this.props.deleteCat}
        updateCat={this.props.updateCat}
      />
    ));

    return (

      <Container>
        <ListGroup>
          {cats}
        </ListGroup>
      </Container>
    )
  }
}


class Cat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateForm: false
    }
  }

  render() {
    return (
      <>
        <ListGroup.Item key={this.props.cat._id}>
          {this.props.cat.name} is {this.props.cat.color}
          <div>
            <Button
              onClick={() => this.setState({ showUpdateForm: true })}
            >
              Update Cat
            </Button>
            <Button
              variant="dark"
              onClick={() => this.props.deleteCat(this.props.cat._id)}
            >
              delete
            </Button>
          </div>
        </ListGroup.Item>
        {
          this.state.showUpdateForm &&
          <UpdateCatForm 
            cat={this.props.cat} 
            updateCat={this.props.updateCat}
          />
        }
      </>
    )
  }
}

export default Cats;
