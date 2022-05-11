import React from 'react';
import Person from './Person.js';
import './Main.css';

class Main extends React.Component {

  render() {

    let people = this.props.data.map((pep, idx) => {
      // console.log(pep.imageURL);
      return (
        <Person 
          name={pep.name} 
          imgURL={pep.imageURL}
          key={idx}
          idx={idx}
          addHearts={this.props.addHearts}
          openModalHandler={this.props.openModalHandler}
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
