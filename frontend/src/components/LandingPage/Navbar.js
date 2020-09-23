import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // handle logout to destroy the cookie
  handleLogout = () => {
    cookie.remove('cookie', { path: '/' });
  }

  render() {
    // if Cookie is set render Logout Button
    let navLogin = null;
    if (cookie.load('cookie')) {
      console.log('Able to read cookie');
      navLogin = (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/" onClick={this.handleLogout}>
              <span className="glyphicon glyphicon-user" />
              Logout
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <div>
        <nav className="navbar navbar-default" style={{backgroundColor: '#d32323'}}>
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li className="active"><Link to="/signup">Signup</Link></li>
              <li className="active"><Link to="/login">Login</Link></li>
            </ul>
            {navLogin}
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
