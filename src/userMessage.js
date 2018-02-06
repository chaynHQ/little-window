const { DF_KEY } = require("../config");
const apiai = require("apiai");

const app = apiai(DF_KEY);

const userMessage = (req, res) => {
  const { question } = req.body;

  const request = app.textRequest(question, {
    sessionId: "1"
  });

  request.on("response", function(response) {
    console.log(response.result.fulfillment.messages);

    const { messages } = response.result.fulfillment;

    res.send(messages);

  });

  request.on("error", function(error) {
    console.log(error);
  });

  request.end();
};

module.exports = userMessage;
