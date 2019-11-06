require('dotenv').config();
const http = require("http"); //for twilio incoming
// Read the host address and the port from the environment
const hostname = process.env.HOST;
const port = process.env.PORT;

const express = require("express");
const MessagingResponse = require("twilio").twiml.MessagingResponse; //for twilio incoming

const app = express();



app.get("/api/test", (req, res) => {
  const testData = [
    { id: 1, sourceText: "Good morning", translatedText: "Buenos dias" },
    { id: 2, sourceText: "Good morning", translatedText: "お早うございます" }
  ];

  res.json(testData);
});

// Below post for twilio incoming
app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();
  twiml.message("Thank you for helping test my app");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});
http.createServer(app).listen(port, hostname, () => {
  console.log(`Server running on ${port}`);
});

// const port = 5000;

// app.listen(port, () => console.log(`Server started on port ${port}`));
