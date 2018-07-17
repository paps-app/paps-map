import styled, { css } from "styled-components";

export const BaseInput = styled.input`
  border: 1px solid transparent;
  border-radius: 2px 0 0 2px;
  box-sizing: border-box;
  line-height: 42px;
  outline: none;
`;

export const Input = styled(BaseInput)`
  background-color: #fff;
  font-family: Roboto;
  font-size: 15px;
  font-weight: 300;
  margin-left: 12px;
  padding: 0 2em 0 1em;
  text-overflow: ellipsis;
  width: 260px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);

  &:focus {
    border-color: #4d90fe;
  }

  ${p =>
    p.origin &&
    css`
      & {
        margin-top: 1rem;
      }
    `};
  ${p =>
    p.dest &&
    css`
      & {
        margin-top: 0.6rem;
      }
    `};
`;

export const DistanceOutput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em;
  text-align: center;

  > div {
    font-size: 2em;
  }
`;

export const ModeSelector = styled.div`
  color: #fff;
  background-color: #4d90fe;
  margin-left: 12px;
  padding: 5px 11px 0px 11px;

  label {
    font-family: Roboto;
    font-size: 13px;
    font-weight: 300;
  }
`;
