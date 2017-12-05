// @flow
import React from "react";
import styled from "styled-components";

type Props = {
  onClick: Function,
  value: string,
  id: number
}

const Option = (props: Props) => <Items onClick={props.onClick}>{props.value}</Items>;

const Items = styled.p`
  height: 1.8em;
  margin: 0 0 0 0;
  padding: 0.3em 0 0 1.8em;
  font: 0.8125em "Open Sans" !important;
  color: #303030;
`;

export default Option;
