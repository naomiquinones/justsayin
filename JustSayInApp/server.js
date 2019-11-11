require("dotenv").config();
console.log(process.env.PORT);
// Read the host address and port from the environment
const hostname = process.env.HOST;
const port = process.env.PORT;

const express = require("express");
const MessagingResponse = require("twilio").twiml.MessagingResponse; //for twilio incoming

const app = express();

// bring in twilio files
const viewSMS = require("./messaging/view_sms");
const sendSMS = require("./messaging/send_sms");

// test endpoint
app.get("/api/test", (req, res) => {
  const testData = [
    { id: 1, sourceText: "Good morning", translatedText: "Buenos dias" },
    { id: 2, sourceText: "Good morning", translatedText: "お早うございます" }
  ];

  res.json(testData);
});

// app.post("/api/message", (req, res) => {
// Send a message
let recipients = [process.env.TEST_RECIPIENT2];

// let recipients = ["+5102258545"];
let msg = "Special message from the Just Say In app";
for (let recipient of recipients) {
  sendSMS.send(recipient, msg);
}
// console.log(req);
// });

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
