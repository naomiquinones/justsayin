require("dotenv").config({ path: "./../../../.env" });
const apiKey = process.env.JUST_SAY_IN_GOOGLE_TRANSLATE_API_KEY;

console.log(
  "In googleTranslate.js, process.env.GOOGLE_TRANSLATE_API_KEY is ",
  process.env.JUST_SAY_IN_GOOGLE_TRANSLATE_API_KEY
);

export const googleTranslate = require("google-translate")(apiKey);
