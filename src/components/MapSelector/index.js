import React from "react";

import { ModeSelector, Switcher } from "./styles";

const storage = window.localStorage;

const MapSelector = ({ selected, onStyleChange }) => (
  <ModeSelector>
    <div>
      <input
        type="radio"
        id="dark"
        value="dark"
        onChange={onStyleChange}
        checked={selected === "dark"}
      />
      <Switcher htmlFor="dark">
        <em>
          <i />
        </em>
        <span>Dark</span>
      </Switcher>
    </div>
    <div>
      <input
        type="radio"
        id="gris"
        value="gris"
        onChange={onStyleChange}
        checked={selected === "gris"}
      />
      <Switcher htmlFor="gris">
        <em>
          <i />
        </em>
        <span>Gris</span>
      </Switcher>
    </div>
    <div>
      <input
        type="radio"
        id="lieux"
        value="lieux"
        onChange={onStyleChange}
        checked={selected === "lieux"}
      />
      <Switcher htmlFor="lieux">
        <em>
          <i />
        </em>
        <span>Lieux</span>
      </Switcher>
    </div>
  </ModeSelector>
);

export const getStorageMapStyle = () => {
  let mapStyleObj = null;
  let mapStyleSelected = null;
  if ("localStorage" in window && storage.getItem("__gmap__mapStyle__")) {
    mapStyleObj = JSON.parse(storage.getItem("__gmap__mapStyle__"));
    const tmp = mapStyleObj.selectedStyle;
    // Update monkey patch this value plz 🙂
    if (/magma|mapco|snazzy/.test(tmp)) {
      mapStyleSelected = "lieux";
    } else {
      mapStyleSelected = tmp;
    }
  }
  return mapStyleObj && mapStyleSelected;
};

export const setStorageMapStyle = newStyle => {
  storage.setItem(
    "__gmap__mapStyle__",
    JSON.stringify({ selectedStyle: newStyle, updatedAt: Date.now() })
  );
};

export default MapSelector;
