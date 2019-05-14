export { isOffWorkingHours } from "./dates";
export { getStoredMapCountry, setStoredMapCountry } from "./localStorage";
export { computeTotalDistance } from "./map";

export const computeDistanceToPrice = distance => {
  let monee = 0;
  let monee1 = 0;
  if (distance <= 2500) {
    monee = 1000 || 25900;
    monee1 = 25;
  } else if (distance > 2500 && distance <= 7500) {
    monee = 1500;
  } else if (distance > 7500 && distance <= 12500) {
    monee = 2000;
  } else if (distance > 12500 && distance <= 15000) {
    monee = 2500;
  } else if (distance > 15000 && distance <= 20000) {
    monee = 3000;
  } else if (distance > 20000 && distance <= 30000) {
    monee = 4000;
  } else if (distance > 30000 && distance <= 40000) {
    monee = 5000;
  } else if (distance > 40000 && distance <= 50000) {
    monee = 6000;
  } else if (distance > 50000 && distance <= 60000) {
    monee = 7000;
  } else {
    monee = null;
  }
  return monee;
};

export const computeDistanceToPriceMinivan = distance => {
  let monee = 0;
  if (distance <= 2500) {
    monee = 4000;
  } else if (distance > 2500 && distance <= 7500) {
    monee = 5000;
  } else if (distance > 7500 && distance <= 12500) {
    monee = 6000;
  } else if (distance > 12500 && distance <= 15000) {
    monee = 7000;
  } else if (distance > 15000 && distance <= 20000) {
    monee = 8500;
  } else if (distance > 20000 && distance <= 30000) {
    monee = 10000;
  } else if (distance > 30000 && distance <= 40000) {
    monee = 11500;
  } else if (distance > 40000 && distance <= 50000) {
    monee = 13000;
  } else if (distance > 50000 && distance <= 60000) {
    monee = 14500;
  } else {
    monee = null;
  }
  return monee;
};

export const computeDistanceToPriceVan = distance => {
  let monee = 0;
  if (distance <= 2500) {
    monee = 8000;
  } else if (distance > 2500 && distance <= 7500) {
    monee = 10000;
  } else if (distance > 7500 && distance <= 12500) {
    monee = 12000;
  } else if (distance > 12500 && distance <= 15000) {
    monee = 14000;
  } else if (distance > 15000 && distance <= 20000) {
    monee = 17000;
  } else if (distance > 20000 && distance <= 30000) {
    monee = 20000;
  } else if (distance > 30000 && distance <= 40000) {
    monee = 23000;
  } else if (distance > 40000 && distance <= 50000) {
    monee = 26000;
  } else if (distance > 50000 && distance <= 60000) {
    monee = 29000;
  } else {
    monee = null;
  }
  return monee;
};

export const computePlace = (place, bounds) => {
  if (place.geometry) {
    if (place.geometry.viewport) {
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  } else {
    // throw new Error("Veuillez choisir une position dans la liste déroulante");
    window.alert(
      "Veuillez sélectionner que les résultats sur la liste défilante"
    );
  }
};

export const formatDateToString = (d, pad, tomorrow) => {
  const date = new Date(d);
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let padder = pad || 0;
  let whatDay = tomorrow ? day + 1 : day;
  let whatHour = tomorrow ? 8 : hours;

  const leadWithZero = t => (t = t < 10 ? `0${t}` : t);

  const strTime = `${leadWithZero(whatHour + padder)}:${leadWithZero(
    minutes
  )}:00`;
  return `${year}-${leadWithZero(month + 1)}-${leadWithZero(
    whatDay
  )} ${strTime}`;
};

// console.log(formatDateToString(new Date(), 1));
