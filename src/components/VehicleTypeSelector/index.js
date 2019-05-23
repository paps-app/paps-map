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
        id="scooter"
        value="scooter"
        onChange={onVehicleTypeChange}
        checked={selected === "scooter"}
      />
      <label htmlFor="scooter" title="scooter">
        <MotoIcon />
        <span>Scooter</span>
      </label>
    </Switcher>
    <Switcher>
      <input
        type="radio"
        id="berlingo"
        title="voiture"
        value="berlingo"
        onChange={onVehicleTypeChange}
        checked={selected === "berlingo"}
      />
      <label htmlFor="berlingo" title="Auto">
        <CarIcon />
        <span>Voiture</span>
      </label>
    </Switcher>
    <Switcher>
      <input
        type="radio"
        id="jumper"
        value="jumper"
        onChange={onVehicleTypeChange}
        checked={selected === "jumper"}
      />
      <label htmlFor="jumper" title="Camion">
        <VanIcon />
        <span>jumper</span>
      </label>
    </Switcher>
  </ModeSelector>
);
export default VehicleTypeSelector;
