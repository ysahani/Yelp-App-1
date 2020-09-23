import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      err: true,
    };
  }

  handleUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  }

  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  }

  // submit Login handler to send a request to the node backend
  submitLogin = (e) => {
    // const headers = new Headers();
    // prevent page from refresh
    e.preventDefault();

    const { username } = this.state;
    const { password } = this.state;

    const data = {
      user: username,
      pass: password,
    };
    // set the with credentials to true
    axios.defaults.withCredentials = true;
    // make a post request with the user data
    axios.post('http://localhost:3001/login', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            err: true,
          });
        } else {
          this.setState({
            err: false,
          });
        }
      });
  }

  render() {
    const { err } = this.state;
    let errButton;
    if (err === false) {
      errButton = <p style={{ color: 'red', textAlign: 'center' }}>Please Enter Correct Credentials</p>;
    } else if (err === true) {
      errButton = null;
    }
    let redirectVar = null;
    if (cookie.load('cookie')) {
      redirectVar = <Redirect to="/restaurantpage" />;
    }
    return (
      <div style={{ textAlign: 'center' }}>
        { redirectVar }
        <form>
          <label htmlFor="fname">
            Email ID:
            <input type="text" id="email" name="email" onChange={this.handleUsername} />
          </label>
          <br />
          <label htmlFor="lname">
            Password:
            <input type="password" id="password" name="password" onChange={this.handlePassword} />
          </label>
          <br />
          <button onClick={this.submitLogin} type="submit">Log In</button>
        </form>
        {errButton}
      </div>
    );
  }
}
