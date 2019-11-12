require("dotenv").config();
const translate = (
  textToTranslate = "Hola, son las 3:42 de la tarde",
  sourceLanguage = "es",
  targetLanguage = "ja"
) => {
  const translator = require("../utils/googleTranslate");

  translator.translate(
    textToTranslate,
    sourceLanguage,
    targetLanguage,
    (err, translation) => {
      console.log(translation.translatedText);
    }
  );
  // translator.getSupportedLanguages(sourceLanguage, (err, codes) => {
  //   console.log(codes);
  // });
};
module.exports = translate;
