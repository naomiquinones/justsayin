require("dotenv").config({ path: "../.env" });

// Twilio SMS code
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid, authToken);
twilioClient.messages
  .create({
    body: "Testing my app again. Today is November 5, 2019.",
    from: "+13236153004",
    to: "+13109486677"
  })
  .then(message => console.log(message.sid));
// end Twilio SMS code
