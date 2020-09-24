import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './RestaurantPage.css';

export default class RestaurantPage extends Component {
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
            <li><Link to="/restaurantpage">Profile Overview</Link></li>
            <li><Link to="/signup">Menu</Link></li>
            <li><Link to="/reviewspage">Reviews</Link></li>
          </ul>
        </div>
        <div id="about">
          <h4 id="aboutName">
            About Name
          </h4>
          <h5 className="subtitle">
            <b>Location</b>
            <p>hi</p>
          </h5>
          <h5 className="subtitle">
            <b>Description</b>
            <p>hi</p>
          </h5>
          <h5 className="subtitle">
            <b>Contact Information</b>
            <p>hi</p>
          </h5>
          <h5 className="subtitle">
            <b>Timings</b>
            <p>hi</p>
          </h5>
        </div>
      </div>
    );
  }
}
