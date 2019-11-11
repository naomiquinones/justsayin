const apiKey = process.env.JUST_SAY_IN_APP_GOOGLE_TRANSLATE_API_KEY;

module.exports = require("google-translate")(apiKey);
