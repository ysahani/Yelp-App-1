import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class CustomerOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      res: [],
    };
  }

  componentDidMount() {
    const { name } = this.state;
    const data = {
      cName: name,
    };
    axios.post('http://localhost:3001/customerorders', data)
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

  cancel = (e) => {
    console.log(e.currentTarget.id);
    const val = e.currentTarget.id;
    const data = {
      items: val,
    };
    axios.post('http://localhost:3001/cancelorder', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log('Post success in cancel order!');
        } else {
          console.log('Post error in cancel order!');
        }
      });
  }

  render() {
    const contents = this.state.res.map((item) => (
      <tr>
        <td>
          {item.items}
        </td>
        <td>
          {item.order_option}
        </td>
        <td>
          <button id={item.items} type="submit" onClick={this.cancel}>Cancel Order</button>
        </td>
      </tr>
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
            View Orders
          </h4>
          <br />
        </div>
        <div style={{ textAlign: 'center' }}>
          <label htmlFor="filterorders">
            Filter Orders:
            <select onChange={this.handleFilter}>
              <option value="All Orders">All Orders</option>
              <option value="New Orders">New Orders</option>
              <option value="Delivered Orders">Delivered Orders</option>
              <option value="Cancelled Orders">Cancelled Orders</option>
            </select>
          </label>
          <table className="center">
            { contents }
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rName: state.rName,
  name: state.name,
  city: state.city,
  state: state.state,
});

export default connect(mapStateToProps)(CustomerOrders);
