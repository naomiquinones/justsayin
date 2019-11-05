require('dotenv').config();
const express = require("express");

const app = express();

app.get("/api/test", (req, res) => {
  const testData = [
    { id: 1, sourceText: "Good morning", translatedText: "Buenos dias" },
    { id: 2, sourceText: "Good morning", translatedText: "お早うございます" }
  ];

  res.json(testData);
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
