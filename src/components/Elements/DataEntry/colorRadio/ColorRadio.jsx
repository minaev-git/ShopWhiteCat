// @flow
import React, { Component } from "react";
import type { Color } from "type/product";
import ColorChoice from "./ColorChoice";
import styles from "./colorRadio.css";

type Props = {
  colors: Color[],
  onChangeColor: Function,
  className: string
};

export default class ColorRadio extends Component<Props> {
  componentDidMount() {
    if (this.props.colors.length > 0) {
      this.props.onChangeColor(this.props.colors[0].id);
    }
  }

  render() {
    const colors = this.props.colors.map((color, index) => {
      if (index === 0) {
        return (
          <label
            htmlFor={color.id}
            className={styles.customRadio}
            key={color.id}
          >
            <input
              id={color.id}
              name="color"
              type="radio"
              onClick={() => this.props.onChangeColor(color.id)}
              defaultChecked
            />
            <span style={{ backgroundColor: `${color.hex}` }} />
          </label>
        );
      }
      return (
        <label
          htmlFor={color.id}
          className={styles.customRadio}
          key={color.id}
        >
          <input
            id={color.id}
            name="color"
            type="radio"
            onClick={() => this.props.onChangeColor(color.id)}
          />
          <span style={{ backgroundColor: `${color.hex}` }} />
        </label>
      );
    });

    return (
      <ColorChoice className={this.props.className} length={this.props.colors.length}>
        <p>Цвета:</p>
        {colors}
      </ColorChoice>
    );
  }
}
