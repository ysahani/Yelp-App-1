import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Menu extends Component {
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
      rname: name,
    };

    axios.post('http://localhost:3001/menu', data)
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
          console.log('Post error in menu!');
        }
      });
  }

  addMenu = () => {
    this.props.history.push('/addmenuitem');
  }

  clickLin = (e) => {
    this.props.updateDishName(e.target.innerText);
  }

  render() {
    const contents = this.state.res.map((item) => (
      <tr>
        <td>
          <Link to="/editdish" onClick={this.clickLin}>{item.dish_name}</Link>
        </td>
        <td>
          {item.ingredients}
        </td>
        <td>
          {item.price}
        </td>
        <td>
          {item.category}
        </td>
        <td>
          {item.description}
        </td>
        <td>
          <img src={item.url} alt="" style={{ width: '80px', height: '100px' }} />
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
            Menu
          </h4>
          <button style={{ position: 'relative', left: '175px', bottom: '30px' }} type="submit" onClick={this.addMenu}>Add Menu Item+</button>
        </div>
        <div>
          <ul style={{ listStyle: 'none' }}>
            <li><Link to="/restaurantpage">Profile Overview</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reviewspage">Reviews</Link></li>
          </ul>
        </div>
        <div>
          <table
            style={{
              backgroundColor: '#D2691E', color: 'white', position: 'relative', left: '340px',
            }}
          >
            <tr>
              <th>Dish name</th>
              <th>Ingredients</th>
              <th>Price</th>
              <th>Category</th>
              <th>Description</th>
              <th>Picture</th>
            </tr>
            { contents }
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rname: state.name,
  location: state.location,
});

const mapDispatchToProps = (dispatch) => ({
  updateDishName: (dnam) => {
    dispatch({
      type: 'UPDATE_DNAME', dName: dnam,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
