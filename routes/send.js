const Nexmo = require("nexmo");
require("dotenv").config({ path: "../.env" });

const from = "13054338575";
let msgTo = "18048140932";
let msg = "Howdy";

function sendMessage(msgTo, msg, cb) {
  const nexmo = new Nexmo({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
  });

  nexmo.message.sendSms(from, msgTo, msg, (err, responseData) => {
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

sendMessage(msgTo, msg);
// module.exports = sendMessage;
