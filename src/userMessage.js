const { DF_KEY, GOOGLE_API_1, GOOGLE_API_2 } = require("../config");
const apiai = require("apiai");
const request = require("request");
const saveConversation = require("./database/queries/save_conversation");
const saveMessage = require("./database/queries/save_message");

const app = apiai(DF_KEY);

const userMessage = (req, res) => {
  const { speech } = req.body;
  apiaiCall(req, res, speech);
  saveConversation(req.body.uniqueId);
};

const apiaiCall = (req, res, speech) => {
  saveMessage(speech, req.body.uniqueId);
  const requestdf = app.textRequest(speech, {
    sessionId: req.body.uniqueId
  });

  requestdf.on("response", function(response) {
    const lookup = {
      DivorceIndia: "A2:B",
      DivorcePakistan: "C2:D",
      DivorceItaly: "E2:F",
      DivorceUK: "G2:H",
      DivorceGlobal: "I2:J"
    };
    const { messages } = response.result.fulfillment;
    const data = {
      speech: messages[0].speech,
      options: [],
      resources: [],
      retrigger: ""
    };

    saveMessage(data.speech, response.sessionId);

    const payload = messages[1] ? messages[1].payload : null;
    if (payload.retrigger) {
      data.retrigger = payload.retrigger;
    }

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
      data.options = payload.options ? [...payload.options] : data.options;
      res.send(data);
    }
  });

  requestdf.on("error", function(error) {
    console.log(error);
  });
  requestdf.end();
};

module.exports = userMessage;
