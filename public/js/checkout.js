$(document).ready(function () {

    const phoneInput = $("#icon_telephone").val().trim();
    console.log(phoneInput);

    // Collecting the phone number from the intake form in check-out.html
    $("#checkout").on("click", function (event) {
        event.preventDefault();
        let msgTo = $("#phone").val().trim();
        //  Need to validate the phone number, see if other characters can be filtered out, reg.ex?
        console.log("yo' boy", msgTo);
        sendMessageApi(msgTo);
    });

  var currentUserId;

  $.get("/api/user_data").then(function (userData) {
    currentUserId = userData.id;
    lastOrder();
  });

    });

   
    var orderDetails = [];
    var orderId;
    var price = [];
    console.log(currentUserId)
    function lastOrder(){

  function lastOrder() {
    $.get("/api/order/" + currentUserId).then(function (data) {
       
        renderLastOrder(data);
        orderId = data[data.length - 1].id;
        
    });
  }

    function renderLastOrder(data) {

    orderDetails = JSON.parse(data[data.length - 1].menu_items);
    totalQuantity = data[data.length - 1].quantity;
    totalPrice = data[data.length - 1].total_price;
    console.log(orderDetails);

        orderDetails = JSON.parse(data[data.length - 1].menu_items);
        totalQuantity = data[data.length - 1].quantity;
        totalPrice = data[data.length - 1].total_price;
        
        var newTotalPrice;
       
        for (var i = 0; i < orderDetails.length; i++) {

    for (var i = 0; i < orderDetails.length; i++) {
      price.push(orderDetails[i].price * orderDetails[i].quantities);

      let orderDetailsDisplay = `

                <tr>
                <td>${orderDetails[i].menu_items}</td>
                <td><select data-title = "${orderDetails[i].menu_items}" id = "quantity" class="browser-default quantity" style="width: 100px !important">
                <option value="${orderDetails[i].quantities}">${orderDetails[i].quantities}</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select></td>
                <td><a data-menuitem = "${orderDetails[i].menu_items}" class="waves-effect waves-light btn-small removeItem">Remove Item</a></td>
                </tr>
                    
                `;
      $("#orders").append(orderDetailsDisplay);
    }

    newTotalPrice = price.reduce(quantitySum).toFixed(2);

    $("#totalDisplay").append(`

                <h6><strong>Your total is : <span>${newTotalPrice}</span></strong></h6>
        
                `);
  }

  function removeItem() {
    const item = $(this).data("menuitem");

    for (var i = 0; i < orderDetails.length; i++) {
      if (item === orderDetails[i].menu_items) {
        orderDetails.splice(i, 1);
      }
    }
    updateDB();
  }

  function updateDB() {
    var menuItems = JSON.stringify(orderDetails);
    var orderTotal = orderDetails.map(
      (totals) => totals.quantities * totals.price
    );
    var newTotal = parseInt(orderTotal.reduce(quantitySum, 0).toFixed(2));

    var totalQ = orderDetails.map((quantity) => parseInt(quantity.quantities));
    var totalQuantitySum = totalQ.reduce(quantitySum, 0);

    var orderObj = {
      menu_items: menuItems,
      quantity: totalQuantitySum,
      total_price: newTotal,
    };

    function quantitySum(total, orderDetail){
        
        return total + orderDetail;
      }  

    function updateQuantity(){
        
        var menuTitle = $(this).data("title");
        console.log(menuTitle)
         for (var i = 0; i < orderDetails.length; i++){

            if(orderDetails[i].menu_items === menuTitle){

                orderDetails[i].quantities = $(this).val();
                
            }
         }
            updateDB();
            
        } 

        // Send phone number to api-send-sms-routes.js
    function sendMessageApi(phoneNumber) {
        $.post("/api/checkout", {
        phoneNumber: phoneNumber,
        }).then(function (data) {
        console.log(data);
        });
    }

        //On click functions

        $(document).on("click", ".removeItem", removeItem);

        $("#submitOrder").on("click", function(e){
            
            const phoneInput = $("#icon_telephone").val().trim();
            let phoneNumber = [];
           
            for (var i = 0; i < phoneInput.length; i++){

                if(!isNaN(phoneInput[i])){

                    phoneNumber.push(phoneInput.substr(i, 1));

                } 
            }

            const filteredPhoneNumber = phoneNumber.join("");
            sendMessageApi(filteredPhoneNumber);
           // window.location.href = "./order-review.html";
        });

        $(document).on("change", ".quantity", updateQuantity);
});


           

