import React from "react";

import { ModeSelector, Switcher } from "./styles";

import { ReactComponent as CarIcon } from "assets/svg/van.svg";
import { ReactComponent as MotoIcon } from "assets/svg/frontbike.svg";

const VehicleTypeSelector = ({ selected, onVehicleTypeChange }) => (
  <ModeSelector>
    <Switcher>
      <input
        type="radio"
        id="moto"
        value="moto"
        onChange={onVehicleTypeChange}
        checked={selected === "moto"}
      />
      <label htmlFor="moto">
        <MotoIcon />
        <span>Moto</span>
      </label>
    </Switcher>
    <Switcher>
      <input
        type="radio"
        id="car"
        value="car"
        onChange={onVehicleTypeChange}
        checked={selected === "car"}
      />
      <label htmlFor="car">
        <CarIcon />
        <span>Voiture</span>
      </label>
    </Switcher>
  </ModeSelector>
);

export default VehicleTypeSelector;
