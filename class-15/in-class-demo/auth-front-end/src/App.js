import React from 'react';
import { withAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Content from './Content';
import './App.css';

class App extends React.Component {

  render() {
    return (
      <>
        <h1>Authentication!</h1>
        {
          this.props.auth0.isAuthenticated
          ?
          <LogoutButton/>
          :
          <LoginButton/>
        }
        {
          this.props.auth0.isAuthenticated
          ?
          <Content/>
          :
          <p>Please login</p>
        }
      </>
    )
  }
}

export default withAuth0(App);
