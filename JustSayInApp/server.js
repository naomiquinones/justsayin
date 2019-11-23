require("dotenv").config();

// Read the host address and port from the environment
const hostname = process.env.HOST;
const port = process.env.PORT;

const express = require("express");
const cors = require("cors");
const app = express();

const MessagingResponse = require("twilio").twiml.MessagingResponse;

app.use(cors());
// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// bring in messaging files
const viewSMS = require("./messaging/view_sms");
const sendSMS = require("./messaging/send_sms");

// bring in translation file
const translator = require("./translate/translate");

// language list endpoint
app.get("/languages", async (req, res) => {
  console.log("get languages");
  const langs = await translator.getSupportedLanguages("en");

  res.status(200).json(langs);
});

// send languages endpoint
app.post("/languages", (req, res) => {
  res.send("languages:").sendStatus(200);
});

// translation endpoint
app.post("/translate", async (req, res) => {
  const textToTranslate = req.body.text;
  const sourceLang = req.body.source;
  const targetLang = req.body.target;

  // for (let lang of targetLangs) {
  const translation = await translator.translate(
    textToTranslate,
    sourceLang,
    targetLang
  );
  // console.log("the translated text is:",translation);
  // }
  res.status(200).json(translation);
});

app.post("/message", (req, res) => {
  console.log(req.body);
  const { recipients, message } = req.body;

  // Send a message
  let recipients = req.recipient || [process.env.TEST_RECIPIENT1];

  let msg = message || "Special message from the Just Say In app";
  for (let recipient of recipients) {
    sendSMS.send(recipient, msg);
  }
  console.log(recipient);
  res.sendStatus(200);
});

// Below post for twilio incoming
app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();
  twiml.message("Thank you for helping test this app");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

// viewSMS.viewAll();

// Set app to listen on the server
app.listen(port, hostname, () =>
  console.log(`Using CORS. Server started on ${hostname} at port ${port}`)
);
