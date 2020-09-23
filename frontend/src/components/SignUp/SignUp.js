import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      persona: 'customer',
      // err: true,
    };
  }

  handleChange = (e) => {
    this.setState({
      persona: e.target.value,
    });
  }

  emailChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  }

  passwordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  }

     // submit Login handler to send a request to the node backend
     submitLogin = (e) => {
       // const headers = new Headers();
       // prevent page from refresh
       e.preventDefault();

       const { username } = this.state;
       const { password } = this.state;
       const { persona } = this.state;

       const data = {
         user: username,
         pass: password,
         pers: persona,
       };
       // set the with credentials to true
       axios.defaults.withCredentials = true;
       // make a post request with the user data
       axios.post('http://localhost:3001/signup', data)
         .then((response) => {
           console.log('Status Code : ', response.status);
           if (response.status === 200) {
             this.props.signUserUp();
           } else {
             this.props.dontSignUserUp();
           }
         });
     }

     render() {
       // const { isSignedUp } = this.props;
       console.log(this.props.isSignedUp);
       // const { err } = this.state;
       let errButton;
       if (this.props.isSignedUp === false) {
         errButton = <p style={{ color: 'red', textAlign: 'center' }}>Username Already Registered!</p>;
       } else if (this.props.isSignedUp === true) {
         errButton = null;
       }
       const { persona } = this.state;
       let showForm;
       if (persona === 'customer') {
         showForm = (
           <div style={{ textAlign: 'center' }}>
             <br />
             <label htmlFor="name">
               Name:
               <input type="text" id="name" name="name" />
             </label>
             <br />
             <label htmlFor="email">
               Email ID:
               <input type="text" id="email" name="email" onChange={this.emailChange} />
             </label>
             <br />
             <label htmlFor="password">
               Password:
               <input type="password" id="password" name="password" onChange={this.passwordChange} />
             </label>
             <br />
             <br />
           </div>
         );
       } else if (persona === 'restaurant') {
         showForm = (
           <div>
             <br />
             <label htmlFor="name">
               Restaurant Name:
               <input type="text" id="name" name="name" />
             </label>
             <br />
             <label htmlFor="email">
               Email ID:
               <input type="text" id="email" name="email" onChange={this.emailChange} />
             </label>
             <br />
             <label htmlFor="password">
               Password:
               <input type="password" id="password" name="password" onChange={this.passwordChange} />
             </label>
             <br />
             <label htmlFor="location">
               Location:
               <input type="text" id="location" name="location" />
             </label>
             <br />
             <br />
           </div>
         );
       }
       return (
         <div style={{ textAlign: 'center' }}>
           <label htmlFor="persona">
             Choose a Persona:
             <select id="persona" onChange={this.handleChange} value={persona}>
               <option value="customer">Customer</option>
               <option value="restaurant">Restaurant</option>
             </select>
           </label>
           {showForm}
           <button onClick={this.submitLogin} type="submit">Sign Up</button>
           {errButton}
         </div>
       );
     }
}

const mapStateToProps = (state) => ({
  isSignedUp: state.isSignedUp,
});

const mapDispatchToProps = (dispatch) => ({
  signUserUp: () => { dispatch({ type: 'SIGNUP_USER' }); },
  dontSignUserUp: () => { dispatch({ type: 'DONT_SIGNUP_USER' }); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
