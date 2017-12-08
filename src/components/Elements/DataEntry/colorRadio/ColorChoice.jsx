// @flow
import styled from "styled-components";

const ColorChoice = styled.div`
  display: ${props => (props.length <= 1 ? "none" : "inline-block")};
  margin: 0 0 0 0;
  p {
    display: block;
    margin-bottom: 0.4em;
    font: 1em "Open Sans";
    text-align: center;
    font-weight: 300;
  }
  @media (max-width: 767px) {
    position: absolute;
    left: -8em;
    bottom: 0.6em;
  }
`;

export default ColorChoice;
