import styled, { css } from "styled-components/macro";

import { FlexAndCenter } from "shared/styles";

export const ModeSelector = styled.div`
  ${FlexAndCenter};

  > div * {
    display: inline-block;
    vertical-align: middle;
  }

  > div {
    margin-right: 0.8rem;
  }

  > div:last-child {
    margin-right: 0;
  }
`;

export const Switcher = styled.div`
  label {
    cursor: pointer;
    position: relative;
    opacity: 0.5;
    transition: transform 300ms ease;

    span {
      display: none;
    }

    ${p =>
      p.disabled &&
      css`
        cursor: none;
        pointer-events: none;
        display: flex;
        flex-direction: column;
        opacity: 0.4;
      `};
  }

  input[disabled] + label {
    pointer-events: none;
    opacity: 0.7;
  }

  input[type="radio"] {
    display: none;

    &:checked + label {
      opacity: 1;
      transform: scale(1.1, 1.1);
    }
  }

  .emoji {
    width: 1.8em;
    height: 1.8em;
  }

  .float {
    display: none;
    font-size: 0.7em;
  }
`;
