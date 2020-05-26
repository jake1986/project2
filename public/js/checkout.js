// Collecting the phone number from the intake form in check-out.html
$("#checkout").on("click", function (event) {
  event.preventDefault();
  let msgTo = $("#phone").val().trim();
  //  Need to validate the phone number, see if other characters can be filtered out, reg.ex?
  sendMessageApi(msgTo);
});
// Send phone number to api-send-sms-routes.js
function sendMessageApi(phoneNumber) {
  $.post("/api/checkout", {
    phoneNumber: phoneNumber,
  }).then(function (data) {
    console.log(data);
  });
}
