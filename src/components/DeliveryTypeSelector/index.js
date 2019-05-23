import React from "react";

import { ModeSelector, Switcher } from "./styles";

const DeliveryTypeSelector = ({ selected, onDeliveryTypeChange }) => (
  <ModeSelector>
    <Switcher fontSize="0.9" style={{ marginRight: "1.2rem" }}>
      <input
        type="radio"
        id="soir"
        value="soir"
        onChange={onDeliveryTypeChange}
        checked={selected === "soir"}
      />
      <label htmlFor="soir" title="Ce soir" style={{ fontSize: "0.9rem" }}>
        Livraison après midi
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
      <label htmlFor="express" title="Express" style={{ fontSize: "0.9rem" }}>
        {/*  <VanIcon /> */}
        Livraison Express
      </label>
    </Switcher>
  </ModeSelector>
);
export default DeliveryTypeSelector;
