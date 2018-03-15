// @flow
import React, { Component } from "react";
import type { Node, Element, ChildrenArray } from "react";
import styled from "styled-components";
import Option from "./Option";
import styles from "./select.css";
import arrow from "./arrow.svg";

type Props = {
  children?: ChildrenArray<Element<typeof Option>>,
  style: Array<{
    width: string,
    border: string
  }>,
  onChange: Function
};

type State = {
  isOpen: boolean,
  focusOption: Node,
  currentValue: string
};

export default class Select extends Component<Props, State> {
  static defaultProps = {
    style: {
      width: "20em",
      border: "1px solid #333333"
    }
  };

  state = {
    isOpen: false,
    focusOption: null,
    currentValue:
      this.props.children.length >= 2 ? this.props.children[0].props.value : ""
  };

  componentDidMount = (): void => {
    if (this.props.children.length > 0) {
      this.props.onChange(this.props.children[0].props.id);
    }
  };

  handleOutsideClick = (): void => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  handleSelectClick = (): void => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  handleItemClick = (child: Element<any>): Function => {
    if (this.state.isOpen) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
    return (event: SyntheticMouseEvent<Element<any>>): void => {
      if (this.state.focusOption) {
        this.state.focusOption.classList.remove(styles.active);
      }
      this.props.onChange(child.props.id);
      event.target.classList.add(styles.active);
      this.setState(prevState => ({
        isOpen: !prevState.isOpen,
        currentValue: child.props.value,
        focusOption: event.target
      }));
      event.persist();
    };
  };

  render() {
    if (this.props.children.length <= 1) {
      return null;
    }

    const items = React.Children.map(this.props.children, (child, index) => (
      <li
        role="option"
        aria-selected="false"
        id={`listbox1-${index}`}
        onKeyDown={this.handleItemClick(child)}
        onClick={this.handleItemClick(child)}
      >
        {child}
      </li>
    ));

    return (
      <ListBox
        role="listbox"
        aria-activedescendant="listbox1-1"
        className={this.props.className}
        styles={this.props.style}
      >
        <SelectItem styles={this.props.style} onClick={this.handleSelectClick}>
          <li role="option" aria-selected="true">{this.state.currentValue}</li>
          <img src={arrow} alt="Открыть" />
        </SelectItem>
        <ListItem isOpen={this.state.isOpen} styles={this.props.style}>
          {items}
        </ListItem>
      </ListBox>
    );
  }
}

const ListBox = styled.ul`
  position: relative;
  z-index: 5;
  width: ${props => props.styles.width};
  padding: 0 0 0 0;
  margin: 0 0 0 0;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const SelectItem = styled.ul`
  overflow: hidden;
  position: relative;
  padding: 0 0 0.15em 0;
  border: ${props => props.styles.border};
  width: 100%;
  cursor: pointer;
  li {
    font: 0.8125em "Open Sans";
    color: #303030;
    margin: 0.3em 0 0 0;
    padding: 0 0 0 1.8em;
  }
  img {
    color: black;
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    width: 0.8em;
    height: 0.7em;
  }
`;

const ListItem = styled.ul`
  position: absolute;
  top: 0;
  display: ${props => (props.isOpen ? "block" : "none")};
  width: 100%;
  padding: 0 0 0 0;
  background-color: white;
  border: ${props => props.styles.border};
  cursor: pointer;
  li {
    display: inline-block;
    width: 100%;
    list-style-type: none;
  }
  li:hover {
    background-color: #f5f5f5;
  }
`;
