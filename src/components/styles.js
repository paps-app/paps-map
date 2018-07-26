import styled, { injectGlobal, css } from "styled-components";

import OriginIcon from "../icons/origin.svg";
import DestinationIcon from "../icons/destination.svg";

injectGlobal`
  html, body, #root {
    height: 100%
  }
  body {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
    margin: 0;
  }
  #root {
    display: flex;
    flex-direction: row;
  }
  .map {
    width: 100%;
  }
`;

// const originColor = "#2196f3";
// const destinationColor = "#ff9800";

export const SearchBox = styled.div`
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  background-color: white;
  max-width: 320px;
`;

export const InputGroup = styled.div`
  padding: 2em 1.2em;
  padding-bottom: 10px;
`;

const FlexAndCenter = css`
  display: flex;
  align-items: center;
  text-align: center;
`;

export const Separator = styled.div`
  background-color: #ffd39c;
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
    width: 15px;
    background-size: cover;
  }
`;

export const OriginInput = styled(Input)`
  > label {
    margin-top: 17px;
    height: 15px;
    background-image: url(${OriginIcon});
  }
`;

export const DestinationInput = styled(Input)`
  margin-top: 0.7rem;
  margin-bottom: 1em;
  > label {
    margin-top: 14px;
    height: 19px;
    background-image: url(${DestinationIcon});
  }
`;

export const OuputGroup = styled.div`
  padding: 1em 0.2em;
  padding-bottom: 1.5em;
  font-size: 1.3em;
  ${FlexAndCenter};
  justify-content: space-around;
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
  color: #4c5b73;
  margin-bottom: 1.6em;
  padding: 8px 0;
  ${FlexAndCenter};
  justify-content: space-around;

  > div * {
    display: inline-block;
    vertical-align: middle;
  }

  label {
    font-size: 13px;
    cursor: pointer;
    position: relative;
    margin-right: 16px;

    &[for="mapco"] {
      margin-right: 0;
    }
  }

  input[disabled] + label {
    pointer-events: none;
  }

  input[type="radio"] {
    display: none;

    &:checked + label em {
      border-color: transparent;
      i {
        left: 21px;
      }
    }

    &:checked + label[for="dark"] em {
      background-color: #a8aac1;
      i {
        background-color: #6c788a;
      }
    }

    &:checked + label[for="gris"] em {
      background-color: #c9c9c9;
      i {
        background-color: #6c788a;
      }
    }

    &:checked + label[for="lieux"] em {
      background-color: #aadaff;
      i {
        background-color: #6c788a;
      }
    }
  }
`;

export const Switcher = styled.label`
  em {
    position: relative;
    width: 38px;
    height: 20px;
    border-radius: 12px;
    margin-right: 4px;
    border: 1px solid currentColor;
    transition: background-color 0.25s;

    i {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 14px;
      height: 14px;
      border-radius: 10px;
      background-color: currentColor;
      transition: left 0.25s, background-color 0.25s;
    }
  }
`;
