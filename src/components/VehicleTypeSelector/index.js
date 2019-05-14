import React from "react";

import { ModeSelector, Switcher } from "./styles";

import { ReactComponent as CarIcon } from "assets/svg/van.svg";
import { ReactComponent as MotoIcon } from "assets/svg/frontbike.svg";
import { ReactComponent as VanIcon } from "assets/svg/camion.svg";

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
      <label htmlFor="moto" title="Moto">
        <MotoIcon />
        <span>Moto</span>
      </label>
    </Switcher>
    <Switcher>
      <input
        type="radio"
        id="car"
        title="voiture"
        value="car"
        onChange={onVehicleTypeChange}
        checked={selected === "car"}
      />
      <label htmlFor="car" title="Auto">
        <CarIcon />
        <span>Voiture</span>
      </label>
    </Switcher>
    <Switcher>
      <input
        type="radio"
        id="van"
        value="van"
        onChange={onVehicleTypeChange}
        checked={selected === "van"}
      />
      <label htmlFor="van" title="Camion">
        <VanIcon />
        <span>Van</span>
      </label>
    </Switcher>
  </ModeSelector>
);

export default VehicleTypeSelector;
