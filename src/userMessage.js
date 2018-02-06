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
      DivorceIndia: "A2:B",
      DivorcePakistan: "C2:D",
      DivorceItaly: "E2:F",
      DivorceUK: "G2:H"
    };

    const { messages } = response.result.fulfillment;
    const data = {
      speech: messages[0].speech,
      options: [],
      resources: []
    };

    const payload = messages[1] ? messages[1].payload : null;
    if (payload.resources) {
      const cellRef = lookup[payload.resources];
      const url = GOOGLE_API_1 + cellRef + GOOGLE_API_2;
      request(url, (err, gsres, body) => {
        const resourceArray = JSON.parse(body).values.map(resource => ({
          text: resource[0],
          href: resource[1]
        }));
        data.resources = [...resourceArray];
        res.send(data);
      });
    } else {
      data.options = payload.options ? [...payload.options] : [];
      res.send(data);
    }
  });

  requestdf.on("error", function(error) {
    console.log(error);
  });

  requestdf.end();
};

module.exports = userMessage;
