import styled, { css, injectGlobal } from "styled-components";

import { medias } from "utils/styles";

// const originColor = "#2196f3";
// const destinationColor = "#ff9800";
export const PrimaryColor = "#33a0bf";

injectGlobal`
  html {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    overflow-x: hidden;
  }
  html, body {
    height: 100%;
  }
  body {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
    margin: 0;
    font-size: 100%;
    color: #616c73;
  }
  #root {
    display: flex;
    flex-direction: row;
    height: 100%;
    overflow: hidden;
    
    ${medias.tablet`flex-direction: column-reverse; height: auto;`};

    &.lock-scroll {
      height: 100%;
      overflow: hidden;
    }
  }

  .map {
    width: 100%;
  }

  img.emoji {
    height: 1em;
    width: 1em;
    margin: 0 .05em 0 .1em;
    vertical-align: -0.1em;
  }

`;

export const FlexAndCenter = css`
  display: flex;
  align-items: center;
  text-align: center;
`;

export const PapsLogo = styled.div`
  ${FlexAndCenter};
  padding: 1.6em 1.2em 0;

  img {
    max-width: 100%;
    margin-right: 1rem;
  }

  h2 {
    margin: 0;
  }
`;

export const BaseButton = css`
  display: block;
  border: none;
  background-color: ${p => (p.ghost ? "#ffffff" : PrimaryColor)};
  padding: 0 1rem;
  min-width: 2rem;
  width: 70%;
  color: white;
  margin: 1rem auto 0;
  height: 2.6rem;
  cursor: pointer;
  font-size: 1.05rem;
  border-radius: 3px;
  box-shadow: 0 3px 6px 0 rgba(62, 159, 194, 0.15);
  letter-spacing: 1px;

  ${p =>
    p.ghost &&
    css`
      color: ${PrimaryColor};
      border: 1px solid ${PrimaryColor};
    `};

  &:focus {
    outline: 0;
  }

  ${medias.tablet`font-size: 1em;height: 2.8rem;letter-spacing: 0.6px;`};
`;
