const Nexmo = require("nexmo");
// requiring connection to the .env file
require("dotenv").config();

const from = "13054338575";
const msg = "Thank You For Your Order, It Is Now Ready For Pickup";

// Getting the phone number and calling the sendMessage function
module.exports = function (app) {
  app.post("/api/checkout", function (req, res) {
    const phoneNumber = req.body.phoneNumber;
    sendMessage(phoneNumber, msg);
    res.status(200);
  });
};

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
