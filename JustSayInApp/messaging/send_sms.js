const send = recipient => {
  // Twilio SMS code
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioClient = require("twilio")(accountSid, authToken);
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
  twilioClient.messages
    .create({
      body: "Testing a new message from my app. Today is November 11, 2019.",
      from: twilioPhone,
      to: recipient
    })
    .then(message => console.log(message.sid));
  // end Twilio SMS code
};
module.exports = { send };
