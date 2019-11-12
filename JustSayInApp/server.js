require("dotenv").config();
console.log(process.env.PORT);
// Read the host address and port from the environment
const hostname = process.env.HOST;
const port = process.env.PORT;

const express = require("express");
const MessagingResponse = require("twilio").twiml.MessagingResponse; //for twilio incoming

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// bring in messaging files
const viewSMS = require("./messaging/view_sms");
const sendSMS = require("./messaging/send_sms");

// bring in translation file
const translator = require("./translate/translate");

// test endpoint
app.get("/api/test", (req, res) => {
  const testData = [
    { id: 1, sourceText: "Good morning", translatedText: "Buenos dias" },
    { id: 2, sourceText: "Good morning", translatedText: "お早うございます" }
  ];

  res.json(testData);
});

// translation endpoint
app.post("/api/translate", (req, res) => {
  const toTranslate = req.body.text;
  const sourceLang = req.body.source;
  const targetLang = req.body.target;

  // for (let lang of targetLangs) {
  translator(toTranslate, sourceLang, targetLang);
  // }
  res.sendStatus(200);
});

app.post("/api/message", (req, res) => {
  console.log(req.body);
  // const { recipient } = req.body;

  // Send a message
  // let recipients = req.recipient || [process.env.TEST_RECIPIENT1];

  // let msg = "Special message from the Just Say In app";
  // for (let recipient of recipients) {
  //   sendSMS.send(recipient, msg);
  // }
  // console.log(recipient);
  res.sendStatus(200);
});

// Below post for twilio incoming
app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();
  twiml.message("Thank you for helping test my app");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

// viewSMS.viewAll();

app.listen(port, hostname, () =>
  console.log(`Server started on ${hostname} at port ${port}`)
);
