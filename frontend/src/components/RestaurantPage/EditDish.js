import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class EditDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dish_name: '',
      ingredients: '',
      price: '',
      category: '',
      description: '',
    };
  }

  componentDidMount() {
    const data = {
      restaurant_name: this.props.rname,
      dish_name: this.props.dish_name,
    };
    axios.post('http://localhost:3001/editdish', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log(response);
          this.setState({
            dish_name: response.data[0].dish_name,
            ingredients: response.data[0].ingredients,
            price: response.data[0].price,
            category: response.data[0].category,
            description: response.data[0].description,
          });
          console.log('Post success in edit dish!');
        } else {
          console.log('Post error in edit dish!');
        }
      });
  }

  handleDishname = (e) => {
    this.setState({
      dish_name: e.target.value,
    });
  }

  handleIngredients = (e) => {
    this.setState({
      ingredients: e.target.value,
    });
  }

  handlePrice = (e) => {
    this.setState({
      price: e.target.value,
    });
  }

  handleCategory = (e) => {
    this.setState({
      category: e.target.value,
    });
  }

  handleDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  }

  submitForm = (e) => {
    e.preventDefault();
    const { dish_name } = this.state;
    const { ingredients } = this.state;
    const { price } = this.state;
    const { category } = this.state;
    const { description } = this.state;
    const data = {
      dname: dish_name,
      ing: ingredients,
      prce: price,
      cat: category,
      desc: description,
    };
    axios.post('http://localhost:3001/updatedish', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.props.history.push('/menu');
        } else {
          console.log('Post error in update dish!');
        }
      });
  }

  render() {
    const { dish_name } = this.state;
    const { ingredients } = this.state;
    const { price } = this.state;
    const { category } = this.state;
    const { description } = this.state;
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <form className="yform">
            <label htmlFor="form-text">Dish Name</label>
            <span className="help-block">Name of Dish</span>
            <input id="form-text" name="form-text" type="text" defaultValue={dish_name} onChange={this.handleDishname} />
            <br />
            <br />
            <label htmlFor="form-text">Ingredients</label>
            <span className="help-block">Ingredients of Dish</span>
            <input id="form-text" name="form-text" type="text" defaultValue={ingredients} onChange={this.handleIngredients} />
            <br />
            <br />
            <label htmlFor="form-text">Price</label>
            <span className="help-block">$ Price</span>
            <input id="form-text" name="form-text" type="text" defaultValue={price} onChange={this.handlePrice} />
            <br />
            <br />
            <label htmlFor="form-text">Category</label>
            <span className="help-block">Appetizer, Main Course, Etc.</span>
            <input id="form-text" name="form-text" type="text" defaultValue={category} onChange={this.handleCategory} />
            <br />
            <br />
            <label htmlFor="form-text">Description</label>
            <span className="help-block">Description of Dish</span>
            <input id="form-text" name="form-text" type="text" defaultValue={description} onChange={this.handleDescription} />
            <br />
            <br />
            <button onClick={this.submitForm} type="submit">Save</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rname: state.name,
  location: state.location,
  email: state.email,
  description: state.description,
  timings: state.timings,
  dish_name: state.dName,
});

export default connect(mapStateToProps)(EditDish);
