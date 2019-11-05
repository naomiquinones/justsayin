const http = require("http"); //for twilio incoming

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
  twiml.message("Thank you for using the Just Say In app");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});
http.createServer(app).listen(1337, () => {
  console.log("On port 1337");
});

// const port = 5000;

// app.listen(port, () => console.log(`Server started on port ${port}`));
