const send = () => {
  // Twilio SMS code
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioClient = require("twilio")(accountSid, authToken);
  twilioClient.messages
    .create({
      body: "Hello, sending my message again. Today is November 5, 2019.",
      from: "+13236153004",
      to: "+13102547608"
    })
    .then(message => console.log(message.sid));
  // end Twilio SMS code
};
module.exports = { send };
