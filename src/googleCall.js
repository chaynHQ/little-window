const { GOOGLE_API_1, GOOGLE_API_2 } = require('../config');
const gSheetLookup = require('./googleSheetRef');
const request = require('request-promise');

// returning resources from Google Sheets
const getResource = (countryObj, lang) => {
  console.log('lang', lang);
  console.log('countryObj', countryObj);
  const cellRef = gSheetLookup[countryObj.lookup];
  console.log('cellRef', cellRef);
  const url = `${GOOGLE_API_1}${lang}!${cellRef}${GOOGLE_API_2}`;
  console.log('url', url);

  return request(url).then(body =>
    JSON.parse(body).values.reduce((acc, cur) => [...acc, { text: cur[0], href: cur[1] }], []));
};

const googleCall = (selectedCountries, lang) => {
  return selectedCountries.map(countryObj => getResource(countryObj, lang));
}

module.exports = googleCall;
