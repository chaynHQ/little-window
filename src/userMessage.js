const { DF_KEY, GOOGLE_API_1, GOOGLE_API_2 } = require("../config");
const apiai = require("apiai");
const request = require("request");

const app = apiai(DF_KEY);

const userMessage = (req, res) => {
  const { question } = req.body;

  const requestdf = app.textRequest(question, {
    sessionId: "1"
  });

  requestdf.on("response", function(response) {
    const lookup = {
      DivorceIndia: "A:A",
      DivorcePakistan: "B:B",
      DivorceItaly: "C:C",
      DivorceUK: "D:D"
    };

    const { messages } = response.result.fulfillment;

    const resources = messages[1] ? messages[1].payload : null;
    if (resources) {
      const cellRef = lookup[resources];
      const url = GOOGLE_API_1 + cellRef + GOOGLE_API_2;
      request(url, (err, res, body) => {
        console.log(body);
      });
    }

    res.send(messages);
  });

  requestdf.on("error", function(error) {
    console.log(error);
  });

  requestdf.end();
};

module.exports = userMessage;
