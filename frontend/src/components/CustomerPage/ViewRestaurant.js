import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ViewRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: this.props.results,
      res: [],
    };
  }

  componentDidMount() {
    const { results } = this.state;
    const data = {
      rsults: results,
    };
    axios.post('http://localhost:3001/viewrestaurant', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            res: response.data,
          });
          const { res } = this.state;
          console.log(res);
          console.log('Post success in customer page!');
        } else {
          console.log('Post error in customer page!');
        }
      });
  }

  click = (e) => {
    this.props.updateRname(e.currentTarget.textContent);
  }

  render() {
    const contents = this.state.res.map((item) => (
      <div>
        <p><Link to="/restaurantprof" onClick={this.click}>{item.r_name}</Link></p>
        <hr className="line" />
      </div>
    ));
    return (
      <div>
        <div id="header">
          <h1>{this.props.name}</h1>
          <h2>
            {this.props.city}
            ,
            {' '}
            {this.props.state}
          </h2>
          <hr id="line" />
        </div>
        <div id="events">
          <h4>
            Search Results
          </h4>
          <br />
        </div>
        <div style={{ textAlign: 'center' }}>
          {contents}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.results,
  name: state.name,
  city: state.city,
  state: state.state,
});

const mapDispatchToProps = (dispatch) => ({
  updateRname: (name) => {
    dispatch({
      type: 'UPDATE_RNAME', rName: name,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewRestaurant);
