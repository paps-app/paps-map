import styled from "styled-components/macro";

import { medias } from "utils/styles";

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

export const MapStyled = styled.div`
  height: 100%;
  width: 100%;

  ${medias.tablet`height:80vw`};
`;
