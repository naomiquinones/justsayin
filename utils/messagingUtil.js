const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messageClient = require("twilio")(accountSid, authToken);
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

module.exports = { messageClient, phoneNumber };
