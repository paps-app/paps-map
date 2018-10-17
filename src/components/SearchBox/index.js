import React from "react";

import { isOffWorkingHours } from "utils";

import { PapsLogo } from "shared/styles";

import VehicleTypeSelector from "components/VehicleTypeSelector";
import CountrySelector from "components/CountrySelector";
import PriceDisplay from "components/PriceDisplay";

import LogoColored from "assets/images/logo-colored.png";

import {
  SearchBox,
  InputGroup,
  OriginInput,
  DestinationInput,
  OuputGroup,
  AreWeOff,
  AreWeOffState,
  OptionsSelector
} from "./styles";

// const WorkingMsg = isOffWorkingHours() ? "Fermé" : "Ouvert";

const MapSearchBox = ({
  mapCountryCode,
  price,
  vehicleType,
  onVehicleTypeChange,
  onCountryChange,
  hasNotValidatedPlaces,
  distance,
  onFormValidate,
  onOriginBoxMounted,
  onDestinationBoxMounted
}) => {
  let workingMsg = isOffWorkingHours("08:30:00", "17:30:00") ? "Fermé" : "Ouvert";

  if (mapCountryCode === "bf") {
    workingMsg = isOffWorkingHours("08:00:00", "23:00:00") ? "Fermé" : "Ouvert";
  }

  return (
    <SearchBox>
      <PapsLogo>
        <img src={LogoColored} width="38" alt="Logo de Paps 😎" />
        <h2>Calculez un prix</h2>
      </PapsLogo>
      <InputGroup>
        <OptionsSelector>
          <CountrySelector selected={mapCountryCode} onCountryChange={onCountryChange} />
          <VehicleTypeSelector
            selected={vehicleType}
            onVehicleTypeChange={onVehicleTypeChange}
          />
        </OptionsSelector>
        <OriginInput>
          <label htmlFor="origin" />
          <input
            id="origin"
            ref={onOriginBoxMounted}
            type="text"
            placeholder="Point de départ"
          />
        </OriginInput>
        <DestinationInput>
          <label htmlFor="destination" />
          <input
            id="destination"
            ref={onDestinationBoxMounted}
            type="text"
            placeholder="Point d'arrivée"
          />
        </DestinationInput>
      </InputGroup>
      <OuputGroup>
        <PriceDisplay vehicleType={vehicleType} distance={distance} />
      </OuputGroup>
      {/* <Button type="submit" onClick={onFormValidate}>
        Valider
      </Button>
      {hasNotValidatedPlaces && (
        <div
          style={{
            padding: "1rem",
            marginTop: "1rem",
            textAlign: "center",
            color: "red"
          }}
        >
          Veuillez choisir d'abord deux destinations valides avant de confirmer la course
        </div>
      )} */}
      <AreWeOff>
        <span>Service de prise de commande: </span>
        <AreWeOffState state={workingMsg}>{workingMsg}</AreWeOffState>
      </AreWeOff>
    </SearchBox>
  );
};

export default MapSearchBox;
