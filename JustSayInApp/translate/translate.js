require("dotenv").config();

// get googleTranslate with API key
const translator = require("../utils/googleTranslate");

let textToTranslate = "Baby Miki was born on Saturday, November 9, 2019.";

let sourceLanguage = "en";
let targetLanguage = "es";

translator.translate(textToTranslate, targetLanguage, (err, translation) => {
  console.log(translation.translatedText);
});
translator.getSupportedLanguages(sourceLanguage, (err, codes) => {
  console.log(codes);
});
