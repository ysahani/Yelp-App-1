import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './RestaurantPage.css';

class RestaurantPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div id="header">
          <h1>{this.props.rname}</h1>
          <h2>{this.props.location}</h2>
          <hr id="line" />
        </div>
        <div>
          <ul style={{ listStyle: 'none' }}>
            <li id="update"><Link to="/updateprofile">Update Your Page</Link></li>
            <li><Link to="/restaurantpage">Profile Overview</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reviewspage">Reviews</Link></li>
          </ul>
        </div>
        <div id="about">
          <h4 id="aboutName">
            About
          </h4>
          <h5 className="subtitle">
            <b>Location</b>
            <p>{this.props.location}</p>
          </h5>
          <h5 className="subtitle">
            <b>Description</b>
            <p>{this.props.description}</p>
          </h5>
          <h5 className="subtitle">
            <b>Contact Information</b>
            <p>{this.props.email}</p>
          </h5>
          <h5 className="subtitle">
            <b>Timings</b>
            <p>{this.props.timings}</p>
          </h5>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rname: state.name,
  location: state.location,
  email: state.email,
  timings: state.timings,
  description: state.description,
});

export default connect(mapStateToProps)(RestaurantPage);
