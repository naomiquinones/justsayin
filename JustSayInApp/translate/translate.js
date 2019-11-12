require("dotenv").config();

const translate = (textToTranslate, sourceLanguage, targetLanguage) => {
  const run = require("../utils/googleTranslate");

  let text =
    textToTranslate || "Baby Miki was born on Saturday, November 9, 2019.";

  let source = sourceLanguage || "en";
  let target = targetLanguage || "es";

  run.translate(textToTranslate, targetLanguage, (err, translation) => {
    console.log(translation.translatedText);
  });
  run.getSupportedLanguages(sourceLanguage, (err, codes) => {
    console.log(codes);
  });
};
module.exports = translate;
