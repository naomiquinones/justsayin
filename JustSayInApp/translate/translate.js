require("dotenv").config();
// const axios = require("axios");

/* axios
  .get(
    'https://translation.googleapis.com/language/translate/v2?target={APIKEY}&q="George went to the grocery store this morning, thinking he would buy a gallon of milk. Instead, he came out with a tub of ice cream, two cans of anchovies and a bag of kale."'
  )
  .then(res => {
    console.log(res.data.data.translations[0].translatedText);
  });
 */
const apiKey = process.env.JUST_SAY_IN_GOOGLE_TRANSLATE_API_KEY;
const googleTranslate = require("google-translate")(apiKey);

// const textToTranslate =
//   "George went to the grocery store this morning, thinking he would buy a gallon of milk. Instead, he came out with a tub of ice cream, two cans of anchovies and a bag of kale.";

// googleTranslate.translate(textToTranslate, "es", function(err, translation) {
//   console.log(translation.translatedText);
// });
googleTranslate.getSupportedLanguages("en", (err, codes) => {
  console.log(codes);
});
