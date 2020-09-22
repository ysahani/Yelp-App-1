import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SignUp from './SignUp/SignUp';
import Navbar from './LandingPage/Navbar';

// Create a Main Component
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        {/* Render Different Component based on Route */}
        <Route path="/" component={Navbar} />
        <Route path="/signup" component={SignUp} />
      </div>
    );
  }
}
// Export The Main Component
export default Main;
