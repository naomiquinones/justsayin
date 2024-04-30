const googleTranslate = require("../utils/googleTranslate");

const tr = new googleTranslate.Translate();
// const translator = new googleTranslate.TranslationServiceClient();
// const amazon = require amazon

// in future version, check which translator is best for a particular language pair, then call that translator

const text = "It's 2023 and we need a new translator";
const target = "es";

const translateText = async () => {
  let [translations] = await tr.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  console.log('translations:');
  translations.forEach((translation,i) => {
    console.log(`${text[i]} => (${target}) ${translation}`);
  });
}
translateText();

// module.exports = {
//   translate: (
//     textToTranslate = "Hola, gracias por usar el app",
//     sourceLanguage = "es",
//     targetLanguage = "ja"
//   ) => {
//     const translated = new Promise((resolve, reject) => {
//       google.translate(
//         textToTranslate,
//         sourceLanguage,
//         targetLanguage,
//         (err, translation) => {
//           if (err) {
//             reject("Problem with translation.", err);
//           } else {
//             resolve(translation.translatedText);
//           }
//         }
//       );
//     });

//     return translated;
//   },


//   getSupportedLanguages: sourceLanguage => {
//     const languageList = new Promise((resolve, reject) => {
//       google.getSupportedLanguages(sourceLanguage, (err, langs) => {
//         if (err) {
//           reject("Problem with getting supported languages.", err);
//         } else {
//           resolve(langs);
//         }
//       });
//     });

//     return languageList;
//   }
// };
