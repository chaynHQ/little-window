const { check, validationResult } = require('express-validator');
const { saveConversation, saveMessage } = require('./db');
const { getResponse } = require('./dialogFlow');

// const apiai = require('apiai');
// const googleCall = require('./googleCall');
//
// const app = apiai(DF_KEY);
//
// // error messages in french or english
//
// const errResources = (lang) => {
//   let message;
//   if (lang === 'en') {
//     message = "Sorry, there's been a problem getting the information. Please check the Chayn website or try again later!";
//   } if (lang === 'fr') {
//     message = "Je rencontre un souci technique et j'ai du mal à trouver l'information que tu recherches. N'hésite pas à consulter le site de Chayn ou reviens me voir plus tard ! Merci";
//   }
//   return message;
// };
//
// const errTechnical = (lang) => {
//   let message;
//   if (lang === 'en') {
//     message = "I'm really sorry but I can't chat right now due to technical problems, please check the Chayn website for any information you are looking for or try again later";
//   } if (lang === 'fr') {
//     message = "Je rencontre un souci technique et j'ai bien peur de ne pas pouvoir discuter dans l'immédiat. En attendant que je sois de retour sur pattes, n'hésite pas à consulter le site de Chayn, et reviens me voir plus tard ! Merci";
//   }
//   return message;
// };
//

exports.userMessage = (req, res) => {
  // Check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  // Save message & conversation
  saveConversation(req.body.conversationId);
  saveMessage(req.body.speech, req.body.conversationId);

  // Get response
  const response = getResponse(req, res);

  // Save response

  // Send response
  res.send(response);


};

exports.validate = () => [
  check('speech').not().isEmpty().withMessage('must not be empty'),
  check('lang').not().isEmpty().withMessage('must not be empty'), // TODO: should we update this to isIn(str, values)
  check('conversationId').isUUID(4).withMessage('must be a UUID'),
];
