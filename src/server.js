const { DF_KEY } = require("../config");
const apiai = require("apiai");

const app = apiai(DF_KEY);

const request = app.textRequest("I want a divorce", {
  sessionId: "1"
});

request.on("response", function(response) {
  console.log(response.result.fulfillment.messages);
});

request.on("error", function(error) {
  console.log(error);
});

request.end();
