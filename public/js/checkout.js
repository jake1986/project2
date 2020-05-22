$("#checkout").on("click", function (event) {
  event.preventDefault();
  let msgTo = $("#phone").val().trim();

  console.log("yo' boy", msgTo);
  sendMessageApi(msgTo);
});

function sendMessageApi(phoneNumber) {
  $.post("/api/checkout", {
    phoneNumber: phoneNumber,
  }).then(function (data) {
    console.log(data);
  });
}
