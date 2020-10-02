import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      restaurantName: '',
      location: '',
      customerName: '',
      yelpingSince: '',
      thingsILove: '',
      findMeIn: '',
      blogSite: '',
      dob: '',
      city: '',
      state: '',
      country: '',
      nickname: '',
      phone: '',
      // err: true,
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
            restaurantName: response.data.rname,
            location: response.data.location,
          });
          const { restaurantName } = this.state;
          const { location } = this.state;
          if (response.data.persona && response.data.persona === 'customer') {
            this.setState({
              customerName: response.data.cname,
              yelpingSince: response.data.yelpingSince,
              thingsILove: response.data.thingsILove,
              findMeIn: response.data.findMeIn,
              blogSite: response.data.blogsite,
              dob: response.data.dob,
              city: response.data.city,
              state: response.data.state,
              country: response.data.country,
              nickname: response.data.nickname,
              phone: response.data.phone,
            });
            const { customerName } = this.state;
            const { yelpingSince } = this.state;
            const { thingsILove } = this.state;
            const { findMeIn } = this.state;
            const { blogSite } = this.state;
            const { dob } = this.state;
            const { city } = this.state;
            const { state } = this.state;
            const { country } = this.state;
            const { nickname } = this.state;
            const { phone } = this.state;

            this.props.loginCustomer(username, customerName, yelpingSince, thingsILove, findMeIn, blogSite, dob, city, state, country, nickname, phone);
            this.props.history.push('/customerpage');
          } else {
            this.props.logUserIn(username, restaurantName, location);
          }
        } else {
          this.props.dontLogUserIn();
        }
      });
  }

  render() {
    // const { err } = this.state;
    let errButton;
    if (this.props.isLoggedIn === false) {
      errButton = <p style={{ color: 'red', textAlign: 'center' }}>Please Enter Correct Credentials</p>;
    } else if (this.props.isLoggedIn === true) {
      errButton = null;
    }
    let redirectVar = null;
    if (this.props.isLoggedIn === true) {
      redirectVar = <Redirect to="/restaurantpage" />;
    }
    return (
      <div style={{ textAlign: 'center' }}>
        { redirectVar }
        <h2 style={{ color: '#d32323' }}>Log in to Yelp</h2>
        <br />
        <form>
          <label htmlFor="fname">
            <input placeholder="Email" type="text" id="email" name="email" onChange={this.handleUsername} />
          </label>
          <br />
          <label htmlFor="lname">
            <input placeholder="Password" type="password" id="password" name="password" onChange={this.handlePassword} />
          </label>
          <br />
          <button onClick={this.submitLogin} type="submit">Log In</button>
        </form>
        {errButton}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  logUserIn: (user, name, loc) => {
    dispatch({
      type: 'LOGIN_USER', email: user, rname: name, location: loc,
    });
  },
  loginCustomer: (user, name, yelpingSince, thingsILove, findMeIn, blogSite, dob, city, state, country, nickname, phone) => {
    dispatch({
      type: 'LOGIN_CUSTOMER',
      email: user,
      cname: name,
      yelpSince: yelpingSince,
      love: thingsILove,
      findMe: findMeIn,
      weblog: blogSite,
      dateob: dob,
      acity: city,
      astate: state,
      acountry: country,
      nname: nickname,
      aphone: phone,
    });
  },
  dontLogUserIn: () => { dispatch({ type: 'DONT_LOGIN_USER' }); },
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
