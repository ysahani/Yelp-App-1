import React, { Component } from 'react';
import { connect } from 'react-redux';

class RestaurantEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  submitEvent = () => {
    this.props.history.push('/addevent');
  }

  render() {
    return (
      <div>
        <div id="header">
          <h1>{this.props.rname}</h1>
          <h2>{this.props.location}</h2>
          <hr id="line" />
        </div>
        <div id="events">
          <h4>
            Events
          </h4>
          <button id="addEvent" onClick={this.submitEvent} type="submit">
            Add Event+
          </button>
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

export default connect(mapStateToProps)(RestaurantEvents);
