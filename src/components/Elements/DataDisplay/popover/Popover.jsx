import React, { Component } from "react";
import styled from "styled-components";
import triangle from "./triangle.png";

export default class Popover extends Component {
  state = {
    isOpen: false
  };

  toOpen = () => {
    if (this.state.isOpen) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
    return () => {
      this.setState(prevState => ({
        isOpen: !prevState.isOpen
      }));
    };
  };

  handleOutsideClick = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    let popover = null;

    if (this.state.isOpen) {
      popover = (
        <PopOver>
          {this.props.content}
          <Triangle src={triangle} alt="треугольник" />
        </PopOver>
      );
    }

    const button = React.Children.map(this.props.children, child => (
      <Button onClick={this.toOpen()}>{child}</Button>
    ));

    return (
      <PopOverBox>
        {button}
        {popover}
      </PopOverBox>
    );
  }
}

const PopOverBox = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  z-index: 25;
`;

const PopOver = styled.div`
  position: absolute;
  z-index: 4;
  right: 0.08em;
  width: 15em;
  margin-top: 0.9em;
  background-color: white;
  font: 0.85em "Open Sans";
  text-align: center;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.15);
`;

const Triangle = styled.img`
  position: absolute;
  right: 1em;
  z-index: 6;
  top: -0.6em;
  width: 1.1em;
  height: 0.8em;
`;

const Button = styled.div`
  margin: 0 0 0 0;
  padding: 0 0 0 0;
`;
