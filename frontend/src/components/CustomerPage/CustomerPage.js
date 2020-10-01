import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CustomerPage.css';

export default class CustomerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div id="header">
          <h1>Name</h1>
          <h2>Location</h2>
          <hr id="line" />
        </div>
        <div>
          <ul style={{ listStyle: 'none' }}>
            <li id="update"><Link to="/updateprofile">Update Your Page</Link></li>
          </ul>
        </div>
        <div>
          <br />
          <h4 className="aTitle">About</h4>
          <p className="details">Yelping Since 1978</p>
          <p className="details">Things I love:</p>
          <p className="details">Find Me In:</p>
          <p className="details">My Blog/Website: </p>
          <hr className="aLine" />
          <h4 className="aTitle">Basic Details</h4>
          <p className="details">Name</p>
          <p className="details">DOB:</p>
          <p className="details">City</p>
          <p className="details">State</p>
          <p className="details">Country</p>
          <p className="details">Nick Name</p>
          <hr className="aLine" />
          <h4 className="aTitle">Update Contact Information</h4>
          <p className="details">Email ID</p>
          <p className="details">Phone Number</p>
        </div>
      </div>
    );
  }
}
