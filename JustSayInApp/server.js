require('dotenv').config();
const http = require("http");
const express = require("express");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const app = express();

app.get("/api/test", (req, res) => {
  const testData = [
    { id: 1, sourceText: "Good morning", translatedText: "Buenos dias" },
    { id: 2, sourceText: "Good morning", translatedText: "お早うございます" }
  ];

  res.json(testData);
});

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message("This is Naomi's app");

  res.writeHead(200, {'Content-type': 'text/xml'});
  res.end(twiml.toString());
});
http.createServer(app).listen(1337, () => {
  console.log('Server on port 1337');
});

// const port = 5000;

// app.listen(port, () => console.log(`Server started on port ${port}`));
