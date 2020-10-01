import React, { Component } from 'react';
import axios from 'axios';

export default class UpdateCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yelpingSince: '',
      iLove: '',
      findMeIn: '',
      blogsite: '',
      name: '',
      dateob: '',
      city: '',
      state: '',
      country: '',
      nickname: '',
      emailid: '',
      phone: '',
    };
  }

  handleSince = (e) => {
    this.setState({
      yelpingSince: e.target.value,
    });
  }

  handleiLove = (e) => {
    this.setState({
      iLove: e.target.value,
    });
  }

  handlefindMeIn = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  handleblogsite = (e) => {
    this.setState({
      blogsite: e.target.value,
    });
  }

  handleName = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  handleDateob = (e) => {
    this.setState({
      dateob: e.target.value,
    });
  }

  handleCity = (e) => {
    this.setState({
      city: e.target.value,
    });
  }

  handleState = (e) => {
    this.setState({
      state: e.target.value,
    });
  }

  handleCountry = (e) => {
    this.setState({
      country: e.target.value,
    });
  }

  handleNickName = (e) => {
    this.setState({
      nickname: e.target.value,
    });
  }

  handleEmail = (e) => {
    this.setState({
      emailid: e.target.value,
    });
  }

  handlePhone = (e) => {
    this.setState({
      phone: e.target.value,
    });
  }

  submitUpdate = (e) => {
    e.preventDefault();
    const { yelpingSince } = this.state;
    const { iLove } = this.state;
    const { findMeIn } = this.state;
    const { blogsite } = this.state;
    const { name } = this.state;
    const { dateob } = this.state;
    const { city } = this.state;
    const { state } = this.state;
    const { country } = this.state;
    const { nickname } = this.state;
    const { emailid } = this.state;
    const { phone } = this.state;

    const data = {
      yelpSince: yelpingSince,
      love: iLove,
      findIn: findMeIn,
      weblog: blogsite,
      fullname: name,
      dob: dateob,
      acity: city,
      astate: state,
      acountry: country,
      nname: nickname,
      email: emailid,
      aPhone: phone,
    };

    axios.post('http://localhost:3001/updatecustomer', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.props.history.push('/customerpage');
        } else {
          console.log('Post error in update customer!');
        }
      });
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <form className="yform">
          <label htmlFor="form-text">Yelping Since</label>
          <span className="help-block">Date You Started Yelp</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.rname} onChange={this.handleSince} />
          <br />
          <br />
          <label htmlFor="form-text">Things I Love</label>
          <span className="help-block">Any Hobbies, Passions, etc.</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.location} onChange={this.handleiLove} />
          <br />
          <br />
          <label htmlFor="form-text">Find Me In</label>
          <span className="help-block">Places You Like to Go</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.description} onChange={this.handlefindMeIn} />
          <br />
          <br />
          <label htmlFor="form-text">My Blog/Website</label>
          <span className="help-block">Enter a URL</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.email} onChange={this.handleblogsite} />
          <br />
          <br />
          <label htmlFor="form-text">Name</label>
          <span className="help-block">Your Full Name</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.timings} onChange={this.handleName} />
          <br />
          <br />
          <label htmlFor="form-text">DOB</label>
          <span className="help-block">Your Date of Birth</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.timings} onChange={this.handleDateob} />
          <br />
          <br />
          <label htmlFor="form-text">City</label>
          <span className="help-block">City You Reside In</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.timings} onChange={this.handleCity} />
          <br />
          <br />
          <label htmlFor="form-text">State</label>
          <span className="help-block">State You Reside In</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.timings} onChange={this.handleState} />
          <br />
          <br />
          <label htmlFor="form-text">Country</label>
          <span className="help-block">Country You Reside In</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.timings} onChange={this.handleCountry} />
          <br />
          <br />
          <label htmlFor="form-text">Nick Name</label>
          <span className="help-block">An Alias</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.timings} onChange={this.handleNickName} />
          <br />
          <br />
          <label htmlFor="form-text">Email ID</label>
          <span className="help-block">Email Adress</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.timings} onChange={this.handleEmail} />
          <br />
          <br />
          <label htmlFor="form-text">Phone Number</label>
          <span className="help-block">Your Phone Number</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.timings} onChange={this.handlePhone} />
          <br />
          <br />
          <button onClick={this.submitUpdate} type="submit">Save</button>
        </form>
      </div>
    );
  }
}
