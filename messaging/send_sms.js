const send = (recipient, message) => {
  const sender = require("../utils/messagingUtil");

  if (!message) {
    const today = new Date();
    message = `Please confirm you got this message from Just Say In app, sent at ${today.getHours()}:${today.getMinutes()} on ${today.getMonth()}/${today.getDay()}/${today.getFullYear()}.`;
  }
  sender.messageClient.messages
    .create({
      body: message,
      from: sender.phoneNumber,
      to: recipient
    })
    .then(message => console.log(message.sid));
};
module.exports = { send };
