const google = require("../utils/googleTranslate");
// const amazon = require amazon

// in future version, check which translator is best for a particular language pair, then call that translator

module.exports = {
  translate: (
    textToTranslate = "Hola, gracias por usar el app",
    sourceLanguage = "es",
    targetLanguage = "ja"
  ) => {
    const translated = new Promise((resolve, reject) => {
      google.translate(
        textToTranslate,
        sourceLanguage,
        targetLanguage,
        (err, translation) => {
          if (err) {
            reject("Problem with translation.", err);
          } else {
            resolve(translation.translatedText);
          }
        }
      );
    });

    return translated;
  },

  getSupportedLanguages: sourceLanguage => {
    const languageList = new Promise((resolve, reject) => {
      google.getSupportedLanguages(sourceLanguage, (err, langs) => {
        if (err) {
          reject("Problem with getting supported languages.", err);
        } else {
          resolve(langs);
        }
      });
    });

    return languageList;
  }
};
