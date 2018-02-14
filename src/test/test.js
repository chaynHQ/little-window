const saveConversation = require("../database/queries/save_conversation");
const saveMessage = require("../database/queries/save_message");
const test = require("tape");
const runDbBuild = require("../database/db_build");
const checkChat = require("./checkChat");
const checkMessages = require("./checkMessages");

test("tape is working", t => {
  const num = 2;
  t.equal(num, 2, "should return 2");
  t.end();
});

test("save conversation is working", t => {
  runDbBuild((err, res) => {
    saveConversation("dummyID").then(
      checkChat().then(res => {
        t.equal(res[0].id, 1, "saveConversation working");
        t.end();
      })
    );
  });
});

test("save message is working", t => {
  runDbBuild((err, res) => {
    saveConversation("dummyID").then(
      saveMessage("divorce", "dummyID").then(
        checkMessages(1).then(res => {
          t.equal(res[0].chat, "divorce", "saveMessage working");
          t.end();
        })
      )
    );
  });
});
