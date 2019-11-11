require("dotenv").config();

// get googleTranslate with API key
const googleTranslate = require("../utils/googleTranslate");

let textToTranslate =
  "George went to the grocery store this morning, thinking he would buy a gallon of milk. Instead, he came out with a tub of ice cream, two cans of anchovies and a bag of kale.";

let sourceLanguage = "en";
let targetLanguage = "es";

googleTranslate.translate(textToTranslate, targetLanguage, function(
  err,
  translation
) {
  console.log(translation.translatedText);
});
googleTranslate.getSupportedLanguages(sourceLanguage, (err, codes) => {
  console.log(codes);
});
