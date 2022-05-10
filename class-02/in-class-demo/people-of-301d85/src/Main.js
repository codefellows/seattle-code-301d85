import React from 'react';
import Person from './Person.js';
import data from './data.json';
import './Main.css';

class Main extends React.Component {

  render() {

    let people = [];
    data.forEach((pep, idx) => {
      // console.log(pep.imageURL);
      people.push(
        <Person 
          name={pep.name} 
          imgURL={pep.imageURL}
          key={idx}
          idx={idx}
        />)
    });

    return (
      <main>
        {people}
      </main>
    );
  }
}

export default Main;
