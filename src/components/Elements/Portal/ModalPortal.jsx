import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ModalPortal extends Component {
  render() {
    return ReactDOM.createPortal(this.props.children, document.querySelector('body'))
  }
}
