module.exports = {
  translate: (
    textToTranslate = "Hola, gracias por usar el app",
    sourceLanguage = "es",
    targetLanguage = "ja"
  ) => {
    const google = require("../utils/googleTranslate");
    // const amazon = require amazon
    // const another_translator = require another translator

    // in future version, check which translator is best for a particular language pair, then call that translator
    google.translate(
      textToTranslate,
      sourceLanguage,
      targetLanguage,
      (err, translation) => {
        console.log(translation.translatedText);
        return translation.translatedText;
      }
    );
  },
  getSupportedLanguages: sourceLanguage => {
    const google = require("../utils/googleTranslate");
    google.getSupportedLanguages(sourceLanguage, (err, codes) => {
      console.log(codes);
      return codes;
    });
  }
};
