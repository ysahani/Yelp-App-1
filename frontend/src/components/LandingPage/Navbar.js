import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li className="active"><Link to="/signup">Signup</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
