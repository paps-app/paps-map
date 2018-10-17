import React from "react";

import { computeDistanceToPrice } from "utils";

import DistanceIcon from "icons/distance.svg";
import PriceIcon from "icons/price.svg";
import { DistanceOutput, PriceOuput } from "./styles";

const round = (value, precision) => {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

const PriceDisplay = ({ vehicleType, distance }) => {
  let price = distance !== null ? computeDistanceToPrice(distance) : 0;

  if (vehicleType && vehicleType === "car") {
    price = price * 2;
  }

  if (distance > 60000) {
    return (
      <div
        style={{
          lineHeight: 1.6,
          fontSize: "1rem",
          padding: "0 1rem"
        }}
      >
        Cette course dépasse 60km, veuillez choisir les tarifs des régions pour la prise
        en charge{" "}
        <span role="img" aria-label="ok">
          🙂.
        </span>
      </div>
    );
  }
  return (
    <React.Fragment>
      <DistanceOutput>
        <img src={DistanceIcon} alt="distance" />
        {distance !== null ? (
          <b>
            {round(distance / 1000, 1)}
            km
          </b>
        ) : (
          <b>0 km</b>
        )}
      </DistanceOutput>
      <PriceOuput>
        <img src={PriceIcon} alt="price" />
        <b>{price} FCFA </b>
      </PriceOuput>
      {distance > 60000 && (
        <div
          style={{
            lineHeight: 1.6,
            fontSize: "1rem",
            padding: "0 1rem"
          }}
        >
          Les courses de cette distance ne sont pas supportées sur le site. Veuillez
          appeler le <a href="tel:+221781203020">+221781203020</a> pour la prise en charge{" "}
          <span role="img" aria-label="ok">
            🙂.
          </span>
        </div>
      )}
    </React.Fragment>
  );
};

export default PriceDisplay;
