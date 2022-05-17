import React from 'react';
import axios from 'axios';
import './style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingList: []
    }
  }

  // Here's some non-dry methods to fetch different types of lists
  // How can we dry this out?
  // 1. We could make a single method that takes a type as a parameter
  // 2. We could make a single method and use the browsers' query string!

  getFood = async () => {
    const API = 'http://localhost:3001';
    const shoppingList = await axios.get(`${API}/shoppingList?type=food`);
    this.setState({ shoppingList: shoppingList.data.items });
  }

  getSupplies = async () => {
    const API = 'http://localhost:3001';
    const shoppingList = await axios.get(`${API}/shoppingList?type=supplies`);
    this.setState({ shoppingList: shoppingList.data.items });
  }

  // Goes along with the optional query string button -- do this only if time allows
  // This shows us passing a query string parameter from the browser all the way to the server
  getShoppingListFromQueryString = async () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const listName = params.get('list');
    const API = 'http://localhost:3001';
    const shoppingList = await axios.get(`${API}/shoppingList?type=${listName}`);
    this.setState({ shoppingList: shoppingList.data.items });
  }

  render() {
    return (
      <>
        <button onClick={this.getFood}>Get Food List Directly</button>
        <button onClick={this.getSupplies}>Get Supplies List Directly</button>

        {/* Optional --- only code this out if time allows */}
        <button onClick={this.getShoppingListFromQueryString}>Get Shopping List via Browser Query String</button>

        <ul>
          {this.state.shoppingList.length && this.state.shoppingList.map((item, idx) => (
            <li key={idx}>
              {item}
            </li>
          ))}
        </ul>
      </>
    )
  }
}

export default App;
