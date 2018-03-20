/* eslint-disable import/no-extraneous-dependencies */

const saveConversation = require("../database/queries/save_conversation");
const saveMessage = require("../database/queries/save_message");
const test = require("tape");
const runDbBuild = require("../database/db_build");
const checkChat = require("./checkChat");
const checkMessages = require("./checkMessages");
const myApp = require("../app");
const request = require("supertest")(myApp);

test("tape is working", t => {
  const num = 2;
  t.equal(num, 2, "should return 2");
  t.end();
});

test("save conversation is working", t => {
  runDbBuild(dbErr => {
    t.error(dbErr, "no errors from runDbBuild");
    saveConversation("dummyID")
      .then(() => checkChat())
      .then(res => {
        t.equal(res[0].id, 1, "saveConversation working");
        t.end();
      });
  });
});

test("save message is working", t => {
  runDbBuild(err => {
    t.error(err, "no errors from runDbBuild");
    saveConversation("dummyID")
      .then(() => saveMessage("divorce", "dummyID"))
      .then(() => checkMessages(1))
      .then(res => {
        t.equal(res[0].chat, "divorce", "saveMessage working");
        t.end();
      });
  });
});

test("check /usermessage is returning correct resources", t => {
  request
    .post("/usermessage")
    .expect(200)
    .send('divorce')
    .expect("Content-Type", 'application/json; charset=utf-8')
    .end((err, res) => {
      t.error(err);
      t.deepEqual(res.body.resources, [{ text: 'Chayn Website', href: 'https://chayn.co' }], "should return correct resources");
      t.end();
    });
});
