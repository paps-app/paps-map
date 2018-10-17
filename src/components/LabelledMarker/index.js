import React from "react";
import { Marker, InfoWindow } from "react-google-maps";
import { compose, withStateHandlers } from "recompose";

// import styled from "styled-components";

// const shareStyle = {
//   // position: "absolute",
//   left: 0,
//   top: 0,
//   fontSize: "12px",
//   padding: "6px",
//   color: "white"
// };

// const originStyle = {
//   ...shareStyle,
//   backgroundColor: "#2196F3"
// };

// const destStyle = {
//   ...shareStyle,
//   backgroundColor: "#FF9800"
// };

// export const OriginStyled = styled.div({
//   ...originStyle
// });

// export const DestinationStyled = styled.div({
//   ...destStyle
// });

// const LabelledMarker = ({ position, dir, icon }) => (
//   <MarkerWithLabel
//     position={position}
//     labelAnchor={new google.maps.Point(0, 0)}
//     labelStyle={dir === "origin" ? originStyle : destStyle}
//     icon={icon}
//   >
//     {dir === "origin" ? <span>Point de départ</span> : <span>Point d'arrivée</span>}
//   </MarkerWithLabel>
// );

const enhanceMaker = compose(
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  )
);

const LabelledMarker = enhanceMaker(({ position, dir, icon, isOpen, onToggleOpen }) => (
  <Marker position={position} icon={icon} onClick={onToggleOpen}>
    {isOpen && <LabelledInfo dir={dir} onToggleOpen={onToggleOpen} />}
  </Marker>
));

export const LabelledInfo = ({ dir, onToggleOpen }) => (
  <InfoWindow
    onCloseClick={onToggleOpen}
    options={{ closeBoxURL: "", enableEventPropagation: true }}
  >
    {dir === "origin" ? <span>Point de départ</span> : <span>Point d'arrivée</span>}
  </InfoWindow>
);

export default LabelledMarker;
