import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from "axios";
const config = require('../config.json');

export default class Products extends Component {

  state = {
    newproduct: null,
    products: []
  }

  fetchProducts = async () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state

    try {
      const res = await axios.get(`${config.api.invokeUrl}/users/`);
      //res.header("Access-Control-Allow-Origin", "*");
      const products = res.data;
      //console.log(products)
      this.setState({ products: products });
    } catch (err) {
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

  componentDidMount = () => {
    this.fetchProducts();
  }

  render() {
    const data=this.state.products.Users;
    console.log(data);
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>List of Users :</h1>
            <p className="subtitle is-5">You can see the created users below :</p>
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    {
                      data && data.length > 0
                    ? data.map((product) => 
                    <Product 
                      isAdmin={true}
                      handleUpdateProduct={this.handleUpdateProduct}
                      //handleDeleteProduct={this.handleDeleteProduct}
                      id={product.user_id}
                      name={product.user_email}
                      password={product.user_password}
                      address={product.user_address}
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
