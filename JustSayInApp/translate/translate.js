require("dotenv").config();
module.exports = (
  textToTranslate = "Hola, gracias por usar el app",
  sourceLanguage = "es",
  targetLanguage = "ja"
) => {
  const translator = require("../utils/googleTranslate");

  const run = (textToTranslate, sourceLanguage, targetLanguage) => {
    translator.translate(
      textToTranslate,
      sourceLanguage,
      targetLanguage,
      (err, translation) => {
        console.log(translation.translatedText);
      }
    );
  };
  // translator.getSupportedLanguages(sourceLanguage, (err, codes) => {
  //   console.log(codes);
  // });
};
