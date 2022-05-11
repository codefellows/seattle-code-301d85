import React from 'react';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>People of 301 {this.props.hearts}</h1>
      </header>
    );
  }
}

export default Header;
