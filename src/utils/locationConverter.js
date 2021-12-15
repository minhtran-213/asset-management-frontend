import location from './location.json';

export const convertLocationFromId = (key) => {
  return location.filter((l) => l.locationid === key).map((l) => l.address)[0];
};
