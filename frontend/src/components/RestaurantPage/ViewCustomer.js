import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class ViewCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cName: this.props.cname,
      res: '',
    };
  }

  componentDidMount() {
    const { cName } = this.state;
    const data = {
      cname: cName,
    };

    axios.post('http://localhost:3001/viewcustomer', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            res: response.data,
          });
          console.log(this.state.res.yelpingSince);
        } else {
          console.log('Post error in restaurant events!');
        }
      });
  }

  render() {
    const { res } = this.state;
    return (
      <div>
        <div id="header">
          <h1>{this.props.rname}</h1>
          <h2>{this.props.location}</h2>
          <hr id="line" />
        </div>
        <div>
          <br />
          <h4 className="aTitle">About</h4>
          <p className="details">
            Yelping Since:
            {' '}
            { res.yelpingSince }
          </p>
          <p className="details">
            Things I love:
            {' '}
            {res.thingsILove}
          </p>
          <p className="details">
            Find Me In:
            {' '}
            {res.findMeIn}
          </p>
          <p className="details">
            My Blog/Website:
            {' '}
            {res.blogsite}
          </p>
          <hr className="aLine" />
          <h4 className="aTitle">Basic Details</h4>
          <p className="details">
            Name:
            {' '}
            {res.name}
          </p>
          <p className="details">
            City:
            {' '}
            {res.city}
          </p>
          <p className="details">
            State:
            {' '}
            {res.state}
          </p>
          <p className="details">
            Country:
            {' '}
            {res.country}
          </p>
          <p className="details">
            Nick Name:
            {' '}
            {res.nickname}
          </p>
          <hr className="aLine" />
          <h4 className="aTitle">Contact Information</h4>
          <p className="details">
            Email ID:
            {' '}
            {res.email}
          </p>
          <p className="details">
            Phone Number:
            {' '}
            {res.phone}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rname: state.name,
  location: state.location,
  cname: state.cName,
});

export default connect(mapStateToProps)(ViewCustomer);
