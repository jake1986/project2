const Nexmo = require("nexmo");

const FROM = "13054338575";

function sendMessage(msgTo, msg, cb) {
  const nexmo = new Nexmo({
    apiKey: "9578c978",
    apiSecret: "LFqXRvA5fbDx5UVy",
  });

  nexmo.message.sendSms(FROM, msgTo, msg, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      if (responseData.messages[0]["status"] === "0") {
        console.log("Message sent successfully.");
      } else {
        if (cb) {
          cb(responseData.messages[0]["error-text"]);
        }
        console.log(
          `Message failed with error: ${responseData.messages[0]["error-text"]}`
        );
      }
    }
  });
}

module.exports = sendMessage;
