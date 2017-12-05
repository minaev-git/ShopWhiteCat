import React from "react";
import PropTypes from "prop-types";

function sendProduct(Component) {
  return class SendProduct extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        price: this.props.product.price,
        salePrice: this.props.product.sale_price,
        status: this.props.product.status,
        product: {
          id: this.props.product.id,
          child: null,
          color: null
        }
      };
      this.onChangeChildProduct = this.onChangeChildProduct.bind(this);
      this.onChangeColor = this.onChangeColor.bind(this);
      this.changeProduct = this.changeProduct.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeChildProduct(value) {
      this.setState(prevState => ({
        product: {
          ...prevState.product,
          child: value
        }
      }));
    }

    onChangeColor(id) {
      this.setState(prevState => ({
        product: {
          ...prevState.product,
          color: id
        }
      }));
    }

    onSubmit(event) {
      event.preventDefault();
      this.props.addProduct(this.state.product);
    }

    changeProduct(child) {
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
