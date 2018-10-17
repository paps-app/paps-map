import React, { Component } from "react";

import TheMap from "components/TheMap";
import { getStoredMapCountry, setStoredMapCountry } from "utils";

const Senegal = {
  lat: 14.72653,
  lng: -17.4414
};

const Burkina = {
  lat: 12.3688092,
  lng: -1.5002547
};

const getDefaultCountry = getStoredMapCountry();

class App extends Component {
  state = {
    defaultMapCenter: getDefaultCountry.center,
    defaultCountryCode: getDefaultCountry.code,
    defaultMapChangeCount: 0
  };

  _changeDefaultCountryCode = e => {
    if (e) {
      const newCode = e.target.value;
      const newMapCenter = e.target.value === "bf" ? Burkina : Senegal;

      this.setState(prevState => ({
        defaultMapCenter: newMapCenter,
        defaultCountryCode: newCode,
        defaultMapChangeCount: prevState.defaultMapChangeCount + 1
      }));
      setStoredMapCountry(newCode);
    } else {
      this.setState(prevState => ({
        defaultMapChangeCount: prevState.defaultMapChangeCount + 1
      }));
    }
  };

  render() {
    const { defaultMapCenter, defaultCountryCode, defaultMapChangeCount } = this.state;
    return (
      <TheMap
        key={defaultMapChangeCount}
        defaultMapCenter={defaultMapCenter}
        defaultCountryCode={defaultCountryCode}
        changeDefaultCountryCode={this._changeDefaultCountryCode}
      />
    );
  }
}

export default App;
