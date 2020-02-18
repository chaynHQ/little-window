const request = require('request-promise');

const googleSheetLookup = {
  DivorceIndia: 'A2:B',
  DivorcePakistan: 'C2:D',
  DivorceItaly: 'E2:F',
  DivorceUK: 'G2:H',
  AsylumUK: 'I2:J',
  AsylumCanada: 'K2:L',
  AsylumUAE: 'M2:N',
  AsylumNetherlands: 'O2:P',
  AsylumGermany: 'Q2:R',
  AsylumUSA: 'S2:T',
  AsylumAustralia: 'U2:V',
  AsylumFrance: 'W2:X',
  ProtectingOnline: 'Y2:Z',
  CollectingEvidence: 'AA2:AB',
  MentalHealth: 'AC2:AD',
  RecognisingAbuse: 'AE2:AF',
  HelpingFriend: 'AG2:AH',
  AdditionalResources: 'AI2:AJ',
  PrivacyPolicy: 'AK2:AL',
};

exports.getResources = async (lookupVals, lang) => {
  // For each country, make the call to google sheets & put it into an array to be returned

  const promises = lookupVals.map(async (val) => {
    const cellRef = googleSheetLookup[val];
    const url = `${process.env.GOOGLE_API_1}${lang}!${cellRef}${process.env.GOOGLE_API_2}`;

    const response = await request(url);
    return JSON.parse(response).values;
  });

  // wait until all promises resolve
  const resources = await Promise.all(promises);
  return resources.flat().map((resource) => ({
    text: resource[0],
    href: resource[1],
  }));
};
