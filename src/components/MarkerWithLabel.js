import React from "react";
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";

const originStyle = {
  backgroundColor: "#2196F3",
  fontSize: "14px",
  padding: "6px",
  color: "white"
};

const destStyle = {
  backgroundColor: "#FF9800",
  fontSize: "14px",
  padding: "6px",
  color: "white"
};

const LabelledMarker = ({ position, dir }) => (
  <MarkerWithLabel
    position={position}
    labelAnchor={new google.maps.Point(0, 0)}
    labelStyle={dir === "origin" ? originStyle : destStyle}
  >
    {dir === "origin" ? <span>Point de départ</span> : <span>Point d'arrivée</span>}
  </MarkerWithLabel>
);

export default LabelledMarker;
