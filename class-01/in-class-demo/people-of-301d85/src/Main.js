import React from 'react';
import Person from './Person.js';

class Main extends React.Component {
  render() {
    return (
      <main>
        <Person
          name='Sheyna'
          hairColor='brown'
          hometown='Seatte'
        />
        <Person name='Cody' />
        <Person name='Sam' />
        <Person name='Elizabeth' />
        <Person name='Stanley' />
      </main>
    );
  }
}

export default Main;
