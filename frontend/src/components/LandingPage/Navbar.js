import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import Yelp from '../../yelp.png';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // handle logout to destroy the cookie
  handleLogout = () => {
    // cookie.remove('cookie', { path: '/' });
    this.props.signUserOut();
  }

  render() {
    // if Cookie is set render Logout Button
    let navLogin = null;
    if (this.props.isLoggedIn === true) {
      console.log('Able to read cookie');
      navLogin = (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link style={{ color: 'white' }} to="/login" onClick={this.handleLogout}>
              <span className="glyphicon glyphicon-user" />
              Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      // Else display login button
      console.log('Not Able to read cookie');
      navLogin = (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link style={{ color: 'white' }} to="/login">
              <span className="glyphicon glyphicon-log-in" />
              {' '}
              Login
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <div>
        <nav className="navbar navbar-default" style={{ backgroundColor: '#d32323' }}>
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li><Link style={{ color: 'white' }} to="/signup">Signup</Link></li>
              <li><Link style={{ color: 'white' }} to="/restaurantevents">Events</Link></li>
              <li><Link style={{ color: 'white' }} to="/customerevents">Customer Events</Link></li>
            </ul>
            <img src={Yelp} alt="" style={{ width: '200px', marginLeft: '240px' }} />
            {navLogin}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  signUserOut: () => { dispatch({ type: 'SIGN_OUT' }); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
