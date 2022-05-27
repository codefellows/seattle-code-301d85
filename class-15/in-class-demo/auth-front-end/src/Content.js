import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';


class Content extends React.Component {


  getBooks = async () => {
    if (this.props.auth0.isAuthenticated) {
       // get a token
      // JSON Web token — JWT (pronounced JOT)
      const res = await this.props.auth0.getIdTokenClaims();

      // MUST use double underscore
      const jwt = res.__raw;
      console.log(jwt); // this is as far as you need to go for Lab 15. Get the jwt to log in the console.

      // as per the axios docs we can set a config object to make our axios calls
      const config = {
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books',
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      }
      console.log('config', config);
      const bookResults = await axios(config);

      // // the way we are used to doing this:
      // let url = `${process.env.REACT_APP_SERVER}/books`;
      // const bookResults = await axios.get(url);
      console.log(bookResults.data);


    }
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    // console.log(this.props.auth0.user)
    return (
      <>
        <h3>Content page</h3>
      </>
    )
  }
}

export default withAuth0(Content);
