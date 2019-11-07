const axios = require("axios");

axios
  .get(
    'https://translation.googleapis.com/language/translate/v2?target={APIKEY}&q="George went to the grocery store this morning, thinking he would buy a gallon of milk. Instead, he came out with a tub of ice cream, and two cans of anchovies."'
  )
  .then(res => {
    console.log(res.data.data.translations[0].translatedText);
  });