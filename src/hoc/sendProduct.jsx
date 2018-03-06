import React, { Component } from "react";

function sendProduct(Component) {
  return class SendProduct extends Component {

    state = {
      price: this.props.product.price,
      salePrice: this.props.product.sale_price,
      status: this.props.product.status,
      inCartButton: false,
      product: {
        id: this.props.product.id,
        inCartButton: false,
        child: null,
        color: null
      }
    };

    onChangeChildProduct = value => {
      this.setState(prevState => ({
        product: {
          ...prevState.product,
          child: value
        }
      }));
    }

    onChangeColor = id => {
      this.setState(prevState => ({
        product: {
          ...prevState.product,
          color: id
        }
      }));
    }

    onSubmit = async event => {
      event.preventDefault();
      await this.props.addProduct(this.state.product);
      this.props.getCount();
      this.setState(prevState => ({
        inCartButton: !prevState.inCartButton
      }));
    };

    changeProduct = child => {
      return () => {
        this.setState(() => ({ price: child.price, status: child.status }));
        if (child.status === "sale") {
          this.setState(() => ({
            salePrice: child.sale_price,
            status: child.status
          }));
        }
      };
    }

    render() {
      return (
        <Component
          onChangeChildProduct={this.onChangeChildProduct}
          onChangeColor={this.onChangeColor}
          onSubmit={this.onSubmit}
          changeProduct={this.changeProduct}
          {...this.state}
          {...this.props}
        />
      );
    }
  };
}

export default sendProduct;
