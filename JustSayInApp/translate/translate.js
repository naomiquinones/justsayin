require("dotenv").config();
const translate = (
  textToTranslate = "Message sent from Just Say In app",
  sourceLanguage = "en",
  targetLanguage = "ja"
) => {
  const translator = require("../utils/googleTranslate");

  translator.translate(textToTranslate, targetLanguage, (err, translation) => {
    console.log(translation.translatedText);
  });
  // translator.getSupportedLanguages(sourceLanguage, (err, codes) => {
  //   console.log(codes);
  // });
};
module.exports = translate;
