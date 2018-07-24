import React from "react";

import { ModeSelector, Switcher } from "./styles";

const storage = window.localStorage;

export const getStorageMapStyle = () => {
  let mapStyleObj = null;
  if ("localStorage" in window && storage.getItem("__gmap__mapStyle__")) {
    mapStyleObj = JSON.parse(storage.getItem("__gmap__mapStyle__"));
  }
  return mapStyleObj && mapStyleObj.selectedStyle;
};

export const setStorageMapStyle = newStyle => {
  storage.setItem(
    "__gmap__mapStyle__",
    JSON.stringify({ selectedStyle: newStyle, updatedAt: Date.now() })
  );
};

const MapStyleSelector = ({ selected, onStyleChange }) => (
  <ModeSelector>
    <div hidden>
      <input
        type="radio"
        id="velou"
        value="velou"
        onChange={onStyleChange}
        checked={selected === "velou"}
      />
      <Switcher htmlFor="velou">
        <span>Velou</span>
      </Switcher>
    </div>
    <div>
      <input
        type="radio"
        id="magma"
        value="magma"
        onChange={onStyleChange}
        checked={selected === "magma"}
      />
      <Switcher htmlFor="magma">
        <em>
          <i />
        </em>
        <span>Magma</span>
      </Switcher>
    </div>
    <div>
      <input
        type="radio"
        id="snazzy"
        value="snazzy"
        onChange={onStyleChange}
        checked={selected === "snazzy"}
      />
      <Switcher htmlFor="snazzy">
        <em>
          <i />
        </em>
        <span>Snazzy</span>
      </Switcher>
    </div>
    <div>
      <input
        type="radio"
        id="mapco"
        value="mapco"
        onChange={onStyleChange}
        checked={selected === "mapco"}
      />
      <Switcher htmlFor="mapco">
        <em>
          <i />
        </em>
        <span>Mapco</span>
      </Switcher>
    </div>
  </ModeSelector>
);

export default MapStyleSelector;
