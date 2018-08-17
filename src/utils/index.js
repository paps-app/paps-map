export const computeDistanceToPrice = distance => {
  let monee = 0;
  if (distance <= 2500) {
    monee = 1000;
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

export const computePlace = (place, bounds) => {
  if (place.geometry) {
    if (place.geometry.viewport) {
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  } else {
    // throw new Error("Veuillez choisir une position dans la liste déroulante");
    window.alert("Veuillez sélectionner que les résultats sur la liste défilante");
  }
};

export const formatDateToString = (date, pad) => {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let padder = pad || 0;

  const leadWithZero = t => (t = t < 10 ? `0${t}` : t);

  const strTime = `${leadWithZero(hours + padder)}:${leadWithZero(minutes)}:00`;
  return `${year}-${leadWithZero(month + 1)}-${leadWithZero(day)} ${strTime}`;
};
