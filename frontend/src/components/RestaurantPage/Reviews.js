import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Reviews.css';

export default class Reviews extends Component {
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
        <table>
          <tr>
            <th>Name</th>
            <th>Reviews</th>
          </tr>
          <tr>
            <td>Michael Jordan</td>
            <td>The food was amazing! would definitely come back for even more! I loved every single thing about it.</td>
          </tr>
          <tr>
            <td>Klay Thompson</td>
            <td>The food was great, but the service could have been better.  The waiter forgot my ketchup!</td>
          </tr>
          <tr>
            <td>Bill Gates</td>
            <td>This place was terribly awful.  The food was bland, and the service was super slow. 0/10 for me!</td>
          </tr>
        </table>
      </div>
    );
  }
}
