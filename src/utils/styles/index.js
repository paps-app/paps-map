import { css } from "styled-components";

export const sizes = {
  desktop: 1133,
  phablet: 993,
  tablet: 693,
  mobile: 393
};

/**
 * Provide media queries shorthands from the sizes defined above (desktop, phablet, tablet, mobile)
 */
export const medias = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16;
  // $FlowFixMe: well lazyness!
  accumulator[label] = (...args) =>
    css`
      @media (max-width: ${emSize}em) {
        ${css(...args)};
      }
    `;
  return accumulator;
}, {});

/**
 * Provide media queries values from defined breakpoints (desktop, phablet, tablet, mobile)
 */
export const mQ = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16;
  accumulator[label] = `${emSize}em`;
  return accumulator;
}, {});
/**
 * Other Breakpoints that we need in the app 😇
 */
export const breakpoints = {
  // $FlowFixMe: well lazyness!
  min693: (...args) =>
    css`
      @media (min-width: 693px) {
        ${css(...args)};
      }
    `,
  // $FlowFixMe: well lazyness!
  min793: (...args) =>
    css`
      @media (min-width: 793px) {
        ${css(...args)};
      }
    `,
  // $FlowFixMe: well lazyness!
  min993: (...args) =>
    css`
      @media (min-width: 993px) {
        ${css(...args)};
      }
    `,
  // $FlowFixMe: well lazyness!
  min1293: (...args) =>
    css`
      @media (min-width: 1293px) {
        ${css(...args)};
      }
    `,
  // $FlowFixMe: well lazyness!
  max693: (...args) =>
    css`
      @media (max-width: 693px) {
        ${css(...args)};
      }
    `,
  // $FlowFixMe: well lazyness!
  max993: (...args) =>
    css`
      @media (max-width: 993px) {
        ${css(...args)};
      }
    `,
  // $FlowFixMe: well lazyness!
  max1293: (...args) =>
    css`
      @media (max-width: 1293px) {
        ${css(...args)};
      }
    `
};
