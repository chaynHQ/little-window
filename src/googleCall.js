const request = require('request-promise');
const { GOOGLE_API_1, GOOGLE_API_2 } = require('../config');
const gSheetLookup = require('./googleSheetRef');

// returning resources from Google Sheets
const getResource = (countryObj, lang) => {
  const cellRef = gSheetLookup[countryObj.lookup];
  const url = `${GOOGLE_API_1}${lang}!${cellRef}${GOOGLE_API_2}`;

  return request(url).then(
    (body) => JSON.parse(body).values.reduce(
      (acc, cur) => [...acc, { text: cur[0], href: cur[1] }], [],
    ),
  );
};

const googleCall = (selectedCountries, lang) => selectedCountries.map(
  (countryObj) => getResource(countryObj, lang),
);

module.exports = googleCall;
