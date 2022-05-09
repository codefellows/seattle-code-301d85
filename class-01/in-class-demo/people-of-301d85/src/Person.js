import React from 'react';

class Person extends React.Component {
  render() {
    console.log(this.props.name);
    return (
      <article>
        <h3>{this.props.name}</h3>
        <p>Some content here</p>
      </article>
    )
  }
}
export default Person;
