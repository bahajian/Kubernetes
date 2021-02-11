import React, { Component, Fragment }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ProductAdmin extends Component {

  state = {
    isEditMode: false,
    updatedproductname: this.props.name,
    updatepassword: this.props.password,
    updateaddress: this.props.address
  }

  handleProductEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  }

  handleEditSave = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdateProduct(this.props.id, this.state.updatedproductname, this.state.updatepassword, this.state.updateaddress);
  }

  onAddProductNameChange = event => this.setState({ "updatedproductname": event.target.value });
  onAddPasswordChange = event => this.setState({ "updatepassword": event.target.value });
  onAddAddressChange = event => this.setState({ "updateaddress": event.target.value });

  render() {
    return (
      <div className="tile is-child box notification is-success">
        {
          this.props.isAdmin && 
          <Fragment>
            <a href="/" onClick={this.handleProductEdit} className="product-edit-icon">
              <FontAwesomeIcon icon="edit" />
            </a>
            <button onClick={event => this.props.handleDeleteProduct(this.props.id, event)} className="delete"></button>
          </Fragment>
        }
        {
          this.state.isEditMode 
          ? <div>
              <p>Edit product name</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Enter Username"
                value={this.state.updatedproductname}
                onChange={this.onAddProductNameChange}
              />
              <p>Edit Password</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Enter Password"
                value={this.state.updatepassword}
                onChange={this.onAddPasswordChange}
              />
              <p>Edit Address</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Enter Address"
                value={this.state.updateaddress}
                onChange={this.onAddAddressChange}
              />
              <p className="product-id">id: { this.props.id }</p>
              <button type="submit" 
                className="button is-info is-small"
                onClick={ this.handleEditSave }
              >save</button>
            </div>
          : <div>
              <p className="product-id">id: { this.props.id }</p>
              <p className="product-title">{ this.props.name }</p>
              <p className="product-title">{ this.props.password }</p>
              <p className="product-title">{ this.props.address }</p>
              
            </div>
        }
      </div>
    )
  }
}
