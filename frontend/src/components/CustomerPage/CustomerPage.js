import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './CustomerPage.css';

class CustomerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: [],
    };
  }

  search = (e) => {
    e.preventDefault();
    const data = {
      val: document.getElementById('searchh').value,
    };
    axios.post('http://localhost:3001/customerpage', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            res: response.data,
          });
          const { res } = this.state;
          this.props.updateResults(res);
          this.props.history.push('/viewrestaurant');
          console.log('Post success in customer page!');
        } else {
          console.log('Post error in customer page!');
        }
      });
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <input placeholder="Search for Food.." id="searchh" />
          <button type="submit" onClick={this.search}>Search</button>
        </div>
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
        <div>
          <ul style={{ listStyle: 'none' }}>
            <li id="update"><Link to="/updatecustomer">Update Your Page</Link></li>
          </ul>
        </div>
        <div>
          <br />
          <h4 className="aTitle">About</h4>
          <p className="details">
            Yelping Since:
            {' '}
            {this.props.yelpingSince}
          </p>
          <p className="details">
            Things I love:
            {' '}
            {this.props.thingsILove}
          </p>
          <p className="details">
            Find Me In:
            {' '}
            {this.props.findMeIn}
          </p>
          <p className="details">
            My Blog/Website:
            {' '}
            {this.props.blogsite}
          </p>
          <hr className="aLine" />
          <h4 className="aTitle">Basic Details</h4>
          <p className="details">
            Name:
            {' '}
            {this.props.name}
          </p>
          <p className="details">
            City:
            {' '}
            {this.props.city}
          </p>
          <p className="details">
            State:
            {' '}
            {this.props.state}
          </p>
          <p className="details">
            Country:
            {' '}
            {this.props.country}
          </p>
          <p className="details">
            Nick Name:
            {' '}
            {this.props.nickname}
          </p>
          <hr className="aLine" />
          <h4 className="aTitle">Contact Information</h4>
          <p className="details">
            Email ID:
            {' '}
            {this.props.email}
          </p>
          <p className="details">
            Phone Number:
            {' '}
            {this.props.phone}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.name,
  email: state.email,
  yelpingSince: state.yelpingSince,
  thingsILove: state.thingsILove,
  findMeIn: state.findMeIn,
  blogsite: state.blogsite,
  dob: state.dob,
  city: state.city,
  state: state.state,
  country: state.country,
  nickname: state.nickname,
  phone: state.phone,
});

const mapDispatchToProps = (dispatch) => ({
  updateResults: (results) => {
    dispatch({
      type: 'UPDATE_RESULTS', sResults: results,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerPage);
