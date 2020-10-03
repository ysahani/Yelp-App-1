import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class RestaurantEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.rname,
      res: [],
    };
  }

  componentDidMount() {
    const { name } = this.state;
    const data = {
      aname: name,
    };

    axios.post('http://localhost:3001/restaurantevents', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          // console.log(response.data);
          this.setState({
            res: response.data,
          });
          this.state.res.forEach((item) => {
            console.log(item.name);
          });
        } else {
          console.log('Post error in restaurant events!');
        }
      });
  }

  submitEvent = () => {
    this.props.history.push('/addevent');
  }

  render() {
    // const { res } = this.state;
    const contents = this.state.res.map((item) => (
      <tr>
        <td>
          {item.name}
          <br />
          {item.description}
          <br />
          {item.time}
          <br />
          {item.date}
          <br />
          {item.location}
          <br />
          {item.hashtags}
          <br />
        </td>
      </tr>
    ));
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
        <table>
          { contents }
        </table>
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
