import styled, { css } from "styled-components/macro";

import { medias } from "utils/styles";

import { BaseButton, PrimaryColor, FlexAndCenter } from "shared/styles";

export const OverlayModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: -1;
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
  transition: visibility 100ms, opacity 200ms;

  &.visible {
    visibility: visible;
    opacity: 1;
    z-index: 98;
  }
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: 0 auto;
  transform: translate(-50%, -20%);
  z-index: -1;
  opacity: 0;
  visibility: hidden;
  transition: visibility 100ms, opacity 200ms, transform 250ms;
  background-color: white;
  border-radius: 4px;
  max-width: 490px;

  &.visible {
    visibility: visible;
    opacity: 1;
    transform: translate(-50%, -50%);
    z-index: 99;
    overflow: hidden;
  }

  ${medias.tablet`width:100%;height:100%;border-radius: 0;`};
`;

export const ModalContent = styled.div`
  border-radius: 4px;
  padding: 1rem 2rem 2rem;
  overflow-y: auto;

  ${medias.tablet`padding: 1rem 1.2rem 1.2rem`};
`;

export const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 1.8rem 2rem 1rem;

  ${medias.tablet`padding: 1.1rem 1.2rem`};

  h2 {
    margin: 0;
    font-size: 1.7rem;

    ${medias.tablet`font-size: 1.1rem;`};
  }
`;

export const CloseModalBtn = styled.button`
  margin-left: auto;
  border: none;
  cursor: pointer;
  width: 1.1rem;
  height: 1.1rem;
  color: inherit;
  padding: 0;
  background-color: transparent;

  svg {
    fill: currentColor;
  }

  &:hover svg {
    fill: ${PrimaryColor};
  }
`;

export const PriceIndicator = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
`;

export const PriceTag = styled.span`
  display: inline-block;
  font-weight: 500;
  color: #f37639;
  margin-left: 5px;
`;

export const MainForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InfoMsg = styled.span`
  display: block;
  font-size: 12px;
  padding-top: 0.3rem;
  padding-left: 0.6rem;
  color: #7f929c;

  ${p =>
    p.error &&
    css`
      color: #f92323;
    `};

  ${p =>
    p.big &&
    css`
      font-size: 15px;
      padding-top: 6px;
    `};
`;

export const InputGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 0 1 auto;
  flex-wrap: wrap;

  ${medias.tablet`flex-direction: column;`};

  > div:last-child {
    margin-right: 0;
  }
`;

export const InputField = styled.div`
  margin-top: 1rem;
  flex-basis: ${p => (p.fullWidth ? "100%" : "50%")};
  max-width: ${p => (p.fullWidth ? "100%" : "50%")};
  padding: 0 8px;
  box-sizing: border-box;

  ${medias.tablet`flex-basis: 100%; max-width: 100%;`};

  label {
    font-size: 0.9rem;
    position: absolute;
    left: 9px;
    right: 0;
    width: auto;
    transform-origin: left top;
    will-change: transform;
    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1),
      color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: text;
    color: #7f929c;
    letter-spacing: 0.00937em;
  }
`;

export const Input = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f0f1f3;
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid transparent;

  input {
    border: none;
    box-sizing: border-box;
    outline: none;
    background-color: transparent;
    font-size: 1em;
    font-weight: 300;
    padding: 1.3rem 0.6em 0.3em;
    width: 100%;
    border-radius: 4px 4px 0 0;

    &[id="senderPhoneNumber"],
    &[id="receiverPhoneNumber"] {
      padding-left: 2.4rem;
    }

    &:hover,
    &:focus {
      background-color: #e8e9ea;
    }
  }

  .indicator {
    position: absolute;
    padding-left: 0.4rem;
    padding-top: 0.9rem;
    font-size: 12px;
    color: #7e8c92;
    opacity: 0;
  }

  &.focused {
    border-color: #4d90fe;

    label {
      color: #4d90fe;
    }
  }

  &.filled {
    border-color: #b4bdc3;
    label {
      color: #7f929c;
    }
  }

  &.filled,
  &.focused {
    label {
      transform: ${p =>
        p.labelY
          ? "translateY(-22%) scale(0.77)"
          : "translateY(-50%) scale(0.77)"};
    }

    .indicator {
      opacity: 1;
    }
  }
`;

export const InputGroupRadio = styled.div`
  margin-top: 1.6rem;

  > span {
    display: block;
    margin-bottom: 1rem;
    font-size: 14px;
    color: #4d90fe;
  }

  > div {
    display: flex;
    align-items: center;
    margin-bottom: 0.7rem;

    ${medias.tablet`flex-direction: column; align-items: unset;`};
  }

  label {
    display: block;
    position: relative;
    padding-left: 1.6rem;
    margin-right: 0.6rem;
    font-size: 15px;
    cursor: pointer;

    ${medias.tablet`margin-right:0;margin-top:0.7rem;`};

    &[disabled] {
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.7;
    }

    > div {
      position: absolute;
      top: 0;
      left: 0;
      height: 18px;
      width: 18px;
      background: #e6e6e6;
      border-radius: 50%;

      &:after {
        content: "";
        position: absolute;
        display: none;
        left: 6px;
        top: 6px;
        height: 6px;
        width: 6px;
        background: #fff;
        border-radius: 50%;
      }
    }
  }

  input {
    position: absolute;
    z-index: -1;
    opacity: 0;

    &:checked ~ div {
      background: ${PrimaryColor};
      &:after {
        display: block;
      }
    }

    &:disabled ~ div {
      background: #e6e6e6;
      pointer-events: none;
      cursor: pointer;
    }
  }
`;
export const ButtonGroup = styled.div`
  ${FlexAndCenter};
  justify-content: space-between;
  margin-top: 1rem;
`;
export const SubmitButton = styled.button`
  ${BaseButton};
  width: ${p => p.w || "100%"};
  margin: ${p => p.m && p.m};

  &.disabled {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const LinkButton = styled.a`
  ${BaseButton};
  line-height: 2.6rem;
  text-decoration: none;
  text-align: center;
`;

export const FormResponse = styled.div`
  padding: 1rem 0;
  line-height: 1.7;

  ul a {
    color: #3a99ec;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
