import React from "react";

import { ModeSelector, Switcher } from "./styles";

const DeliveryTypeSelector = ({ selected, onDeliveryTypeChange }) => (
  <ModeSelector>
    <Switcher>
      <input
        type="radio"
        id="soir"
        value="soir"
        onChange={onDeliveryTypeChange}
        checked={selected === "soir"}
      />
      <label htmlFor="soir" title="Ce soir">
        Livraison apres midi
      </label>
    </Switcher>
    <Switcher>
      <input
        type="radio"
        id="express"
        value="express"
        onChange={onDeliveryTypeChange}
        checked={selected === "express"}
      />
      <label htmlFor="express" title="Express">
        {/*  <VanIcon /> */}
        Livraison Express
      </label>
    </Switcher>
  </ModeSelector>
);
export default DeliveryTypeSelector;
