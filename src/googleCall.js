const { GOOGLE_API_1, GOOGLE_API_2 } = require('../config');
const gSheetLookup = require('./googleSheetRef');
const request = require('request-promise');

const getResource = (countryObj) => {
  const cellRef = gSheetLookup[countryObj.lookup];
  const url = GOOGLE_API_1 + cellRef + GOOGLE_API_2;

  return request(url)
    .then((body) => {
      const resourceArray = JSON.parse(body).values.map((resource) => {
        const singleResourceArray = resource.map((str, index, array) => {
          if (index % 2 === 1) return null;
          return { text: array[index], href: array[index + 1] };
        });

        return singleResourceArray.filter(Boolean);
      });
      return [].concat(...resourceArray);
    });
};

const googleCall = selectedCountries =>
  selectedCountries.map(countryObj => getResource(countryObj));

module.exports = googleCall;
