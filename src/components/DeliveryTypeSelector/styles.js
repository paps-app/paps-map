import styled from "styled-components";

import { FlexAndCenter } from "shared/styles";

export const ModeSelector = styled.div`
  ${FlexAndCenter};
  padding: 8px 0;

  > div * {
    display: inline-block;
    vertical-align: middle;
  }

  > div:first-child {
    margin-right: 0.6rem;
  }
`;

export const Switcher = styled.div`
  width: 6.5rem;
  height: 3rem;

  label {
    ${FlexAndCenter};
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    cursor: pointer;
    padding: 0.4rem;
    border: 1px solid;
    border-radius: 4px;
    transition: transform 300ms ease;

    svg {
      height: 1.2em;
      width: 1.2em;
      fill: currentColor;
    }

    span {
      font-size: 0.5em;
      text-transform: uppercase;
      display: none;
    }
  }

  input[disabled] + label {
    pointer-events: none;
    opacity: 0.7;
  }

  input[type="radio"] {
    display: none;

    &:checked + label {
      transform: scale(1.1, 1.1);
      background-color: #3cafcb;
      border-color: #3cafcb;
      color: #fff;
    }
  }

  .emoji {
    width: 2em;
    height: 2em;
  }

  span {
    margin-top: 0.2rem;
  }
`;
