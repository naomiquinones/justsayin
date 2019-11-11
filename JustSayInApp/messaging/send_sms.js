const send = (recipient, message) => {
  const sender = require("../utils/messagingUtil");

  if (!message) {
    const today = new Date();
    message = `Testing a new message from my app at ${today.getHours()}:${today.getMinutes()} on ${today.getMonth()}/${today.getDay()}/${today.getFullYear()}.`;
  }
  sender.messageClient.messages
    .create({
      body: message,
      from: sender.myPhone,
      to: recipient
    })
    .then(message => console.log(message.sid));
  // end Twilio SMS code
};
module.exports = { send };
