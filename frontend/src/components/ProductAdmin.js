import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from "axios";
const config = require('../config.json');

export default class ProductAdmin extends Component {

  state = {
    newproduct: {
      "user_id": "",
      "user_email": "",
      "user_password":"",
      "user_address":""
    },
    products: []
  }

  handleAddProduct = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add product endpoint here
    try {
      const params = {
        "user_id":id,
        "email": this.state.newproduct.user_email,
        "password": this.state.newproduct.user_password,
        "address": this.state.newproduct.user_address
      };
      await axios.post(`${config.api.invokeUrl}/users/`, params);
      this.setState({ products: [...this.state.products.Users, this.state.newproduct] });
      this.setState({ newproduct: { "user_id": "", "user_email": "", "user_password":"" ,"user_address":""}});
      console.log("*********************************************")
      console.log(this.state.products)
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  handleUpdateProduct = async (id, name,password,address) => {
    // add call to AWS API Gateway update product endpoint here
    try {
      const params = {
        "user_id" : id,
        "email": name,
        "password": password,
        "address": address
      };
      console.log("**********************************************");
      console.log(params);
      console.log("----------------------------------------------")
      console.log(name);

      await axios.patch(`${config.api.invokeUrl}/users/${id}`, params);
      const productToUpdate = [...this.state.products.Users].find(product => product.id === id);
      const updatedProducts = [...this.state.products.Users].filter(product => product.id !== id);
      productToUpdate.user_email = name;
      productToUpdate.user_password = password;
      productToUpdate.user_address = address;
      updatedProducts.push(productToUpdate);
      this.setState({products: updatedProducts});
    }catch (err) {
      console.log(`Error updating product: ${err}`);
    }
    
  }

  handleDeleteProduct = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete product endpoint here
    try {
      await axios.delete(`${config.api.invokeUrl}/users/${id}`);
      const updatedProducts = [...this.state.products.Users].filter(product => product.user_id !== id);
      this.setState({products: updatedProducts});
    }catch (err) {
      console.log(`Unable to delete product: ${err}`);
    }
  }

  fetchProducts = async () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/users`);
      const products = res.data;
      this.setState({ products: products });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  onAddProductNameChange = event => this.setState({ newproduct: { ...this.state.newproduct, "user_email": event.target.value } });
  onAddAddressChange = event => this.setState({ newproduct: { ...this.state.newproduct, "user_address": event.target.value } });
  onAddPasswordChange = event => this.setState({ newproduct: { ...this.state.newproduct, "user_password": event.target.value } });
  componentDidMount = () => {
    this.fetchProducts();
  }

  render() {
    const data=this.state.products.Users;
    //console.log(data);
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>User Admin</h1>
            <p className="subtitle is-5">Add and remove Users using the form below:</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleAddProduct(this.state.newproduct.id, event)}>
                  <div className="field has-addons">
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter username"
                        value={this.state.newproduct.user_email}
                        onChange={this.onAddProductNameChange}
                      />
                    </div>
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter password"
                        value={this.state.newproduct.user_password}
                        onChange={this.onAddPasswordChange}
                      />
                    </div>
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter address"
                        value={this.state.newproduct.user_address}
                        onChange={this.onAddAddressChange}
                      />
                    </div>
                    <div className="control">
                      <button type="submit" className="button is-primary is-medium">
                        Add product
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="column is-two-thirds">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                  {
                      data && data.length > 0
                    ? data.map((product) => 
                    <Product 
                      isAdmin={true}
                      handleUpdateProduct={this.handleUpdateProduct}
                      handleDeleteProduct={this.handleDeleteProduct}
                      password={product.user_password}
                      address={product.user_address}
                      name={product.user_email} 
                      id={product.user_id}
                      key={product.user_id}
                      />)
                    : <div className="tile notification is-warning">No products available</div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
