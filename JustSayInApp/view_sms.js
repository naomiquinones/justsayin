const viewAll = () => {
  // Twilio SMS code
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioClient = require("twilio")(accountSid, authToken);
  twilioClient.messages.each(message => console.log(message));
};
module.exports = { viewAll };
