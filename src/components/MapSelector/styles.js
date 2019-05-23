import styled from "styled-components/macro";

import { FlexAndCenter } from "shared/styles";

export const ModeSelector = styled.div`
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
