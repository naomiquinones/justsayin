require("dotenv").config();

// const
const run = require("../utils/googleTranslate");

let textToTranslate = "Baby Miki was born on Saturday, November 9, 2019.";

let sourceLanguage = "en";
let targetLanguage = "es";

run.translate(textToTranslate, targetLanguage, (err, translation) => {
  console.log(translation.translatedText);
});
run.getSupportedLanguages(sourceLanguage, (err, codes) => {
  console.log(codes);
});
