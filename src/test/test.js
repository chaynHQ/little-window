/* eslint-disable import/no-extraneous-dependencies */

const saveConversation = require('../database/queries/save_conversation');
const saveMessage = require('../database/queries/save_message');
const test = require('tape');
const runDbBuild = require('../database/db_build');
const checkChat = require('./checkChat');
const checkMessages = require('./checkMessages');
const nock = require('nock');
const { GOOGLE_API_1, GOOGLE_API_2 } = require('../../config');
const request = require('request');

test('tape is working', t => {
  const num = 2;
  t.equal(num, 2, 'should return 2');
  t.end();
});

test('save conversation is working', t => {
  runDbBuild(dbErr => {
    t.error(dbErr, 'no errors from runDbBuild');
    saveConversation('dummyID')
      .then(() => checkChat())
      .then(res => {
        t.equal(res[0].id, 1, 'saveConversation working');
        t.end();
      });
  });
});

test('save message is working', t => {
  runDbBuild(err => {
    t.error(err, 'no errors from runDbBuild');
    saveConversation('dummyID')
      .then(() => saveMessage('divorce', 'dummyID'))
      .then(() => checkMessages(1))
      .then(res => {
        t.equal(res[0].chat, 'divorce', 'saveMessage working');
        t.end();
      });
  });
});

test('Google Sheets API', t => {
  const expected = {
    resources: 'IndiaDivorce'
  };
  nock(GOOGLE_API_1)
    .get(`/A2:6${GOOGLE_API_2}`)
    .reply(200, { resources: 'IndiaDivorce' });
  request(`${GOOGLE_API_1}A2:6${GOOGLE_API_2}`, (err, res, body) => {
    t.deepEqual(JSON.parse(body), expected, 'correct resource returned');
    t.end();
  });
});
