$(document).ready(function () {

    var currentUserId;

    $.get("/api/user_data").then(function(userData){
        
        currentUserId = userData.id
        lastOrder();

    });

   
    var orderDetails = [];
    var totalQuantity;
    var totalPrice;
    var orderId;
    var price = [];
    
    
    function lastOrder(){

    $.get("/api/order/" + currentUserId).then(function (data) {
        
        renderLastOrder(data);
        orderId = data[data.length - 1].id;
        
    });
}

function renderLastOrder(data) {

    $("#orders").empty();
    $("#totalDisplay").empty();

    orderDetails = JSON.parse(data[data.length - 1].menu_items);
    totalQuantity = data[data.length - 1].quantity;
    totalPrice = data[data.length - 1].total_price;
    
    
    var newTotalPrice;
   
    for (var i = 0; i < orderDetails.length; i++) {

        price.push(orderDetails[i].price * orderDetails[i].quantities);

            let orderDetailsDisplay = (`

            <tr>
            <td>${orderDetails[i].menu_items}</td>
            <td>${orderDetails[i].quantities}</td>
            <td>${orderDetails[i].price}</td>
            </tr>
                
            `);
            $("#receipt").append(orderDetailsDisplay);
        };

            newTotalPrice = price.reduce(quantitySum).toFixed(2);
            
            $("#totalDisplay").append(`

                    <h6><strong>Your total is : <span>${newTotalPrice}</span></strong></h6>
    
            `);
   
};

function quantitySum(total, orderDetail){
        
    return total + orderDetail;
  }  

});