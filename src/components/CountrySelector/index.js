import React from "react";

import { ModeSelector, Switcher } from "./styles";

const CountrySelector = ({ selected, onCountryChange }) => (
  <ModeSelector>
    <Switcher>
      <input
        type="radio"
        id="sn"
        value="sn"
        onChange={onCountryChange}
        checked={selected === "sn"}
      />
      <label htmlFor="sn">
        <img
          draggable="false"
          className="emoji"
          alt="🇸🇳"
          src="https://twemoji.maxcdn.com/2/72x72/1f1f8-1f1f3.png"
        />
        <span>Sénégal</span>
      </label>
    </Switcher>
    <Switcher>
      <input
        type="radio"
        id="bf"
        value="bf"
        onChange={onCountryChange}
        checked={selected === "bf"}
      />
      <label htmlFor="bf">
        <img
          draggable="false"
          className="emoji"
          alt="🇧🇫"
          src="https://twemoji.maxcdn.com/2/72x72/1f1e7-1f1eb.png"
        />
        <span>Burkina Faso</span>
      </label>
    </Switcher>
    <Switcher disabled title="Bientôt">
      <input
        type="radio"
        id="ci"
        value="ci"
        onChange={onCountryChange}
        checked={selected === "ci"}
      />
      <label htmlFor="ci">
        <img
          draggable="false"
          className="emoji"
          alt="🇨🇮"
          src="https://twemoji.maxcdn.com/2/72x72/1f1e8-1f1ee.png"
        />
        <span>Côte d'ivoire</span>
        <span className="float">Bientôt</span>
      </label>
    </Switcher>
  </ModeSelector>
);

export default CountrySelector;
