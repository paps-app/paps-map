import React from "react";

import { computeDistanceToPrice } from "../utils";

import DistanceIcon from "../icons/distance.svg";
import PriceIcon from "../icons/price.svg";
import { DistanceOutput, PriceOuput } from "./styles";

const WillBeCharged = ({ distance }) => {
  const price = distance !== null ? computeDistanceToPrice(distance) : 0;

  if (distance > 60000) {
    return (
      <div>
        Veuillez choisir le tarif des régions pour cette course{" "}
        <span role="img" aria-label="ok">
          🙂
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
            {Math.round(distance) / 1000}
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
    </React.Fragment>
  );
};

export default WillBeCharged;
