const storage = window.localStorage;

const Senegal = {
  lat: 14.72653,
  lng: -17.4414
};

const Burkina = {
  lat: 12.3688092,
  lng: -1.5002547
};

const CountryCoords = {
  sn: Senegal,
  bf: Burkina
};

export const getStoredMapCountry = () => {
  if (!storage.getItem("__gmap__country")) {
    return { code: "sn", center: Senegal, updatedAt: new Date() };
  }
  return JSON.parse(storage.getItem("__gmap__country"));
};

export const setStoredMapCountry = newCode => {
  const newMapCenter = CountryCoords[newCode];

  storage.setItem(
    "__gmap__country",
    JSON.stringify({ code: newCode, center: newMapCenter, updatedAt: new Date() })
  );
};
