import styled, { injectGlobal, css } from "styled-components";

import OriginIcon from "../icons/origin.svg";
import DestinationIcon from "../icons/destination.svg";

injectGlobal`
  html, body, #root {
    height: 100%
  }
  body {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif
  }
`;

// const originColor = "#2196f3";
// const destinationColor = "#ff9800";

export const SearchBox = styled.div`
  position: absolute;
  top: 3em;
  left: 0.6em;
  z-index: 1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  background-color: white;
  width: 330px;
`;

export const InputGroup = styled.div`
  padding: 2em;
  padding-bottom: 10px;
`;

const FlexAndCenter = css`
  display: flex;
  align-items: center;
  text-align: center;
`;

export const Separator = styled.div`
  background-color: #ffd39c;
  ${"" /* height: 1em; */};
`;

export const BaseInput = styled.div`
  > input {
    border: none;
    border-bottom: 1px solid #dadada;
    border-radius: 2px 0 0 2px;
    box-sizing: border-box;
    outline: none;
  }
`;

export const Input = styled(BaseInput)`
  display: flex;
  justify-content: center;
  align-items: baseline;

  > input {
    background-color: #fff;
    font-size: 15px;
    font-weight: 300;
    padding: 1em 1em 6px 0;
    text-overflow: ellipsis;
    width: 260px;

    &:focus {
      border-color: #4d90fe;
    }
  }

  label {
    cursor: pointer;
    margin-right: 12px;
    width: 16px;
    height: 16px;
    background-size: cover;
  }
`;

export const OriginInput = styled(Input)`
  > label {
    background-image: url(${OriginIcon});
  }
`;

export const DestinationInput = styled(Input)`
  > input {
    margin-top: 0.6rem;
    margin-bottom: 1em;
  }
  > label {
    width: 12px;
    background-image: url(${DestinationIcon});
  }
`;

export const OuputGroup = styled.div`
  padding: 1em;
  padding-bottom: 1.5em;
  font-size: 1.3em;
  ${FlexAndCenter} justify-content: space-around;
`;

export const OutputGroupContent = styled.div`
  ${FlexAndCenter};
  justify-content: center;
  flex-direction: column;
  img {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }
  > div {
    b {
      font-weight: 500;
      display: block;
      color: #46affc;
    }
  }
`;

export const DistanceOutput = styled(OutputGroupContent)`
  b {
    color: #46affc;
  }
`;

export const PriceOuput = styled(OutputGroupContent)`
  b {
    color: #f37639;
  }
`;

export const ModeSelector = styled.div`
  color: #fff;
  background-color: #4d90fe;
  margin-bottom: 1.6em;
  padding: 8px 5px;
  ${FlexAndCenter};
  justify-content: space-around;

  > div * {
    display: inline-block;
    vertical-align: middle;
  }

  label {
    font-size: 13px;
    cursor: pointer;
  }

  input[disabled] + label {
    pointer-events: none;
  }
`;
