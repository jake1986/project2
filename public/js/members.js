$(document).ready(function() {

  let currentUser;
  let currentUserId;
  let menuItems = [];
  let orderObj;

  $.get("/api/user_data").then(function(data) {

    currentUser = data.firstName + " " + data.lastName;
    currentUserId = data.id;
    
    $(".member-name").append(currentUser)
    
  });

    $.get("/api/menus").then(function(menuData){
        
        const brunchData = menuData.filter(brunchItems => brunchItems.description === "Brunch");
        const drinksData = menuData.filter(brunchItems => brunchItems.description === "drink");
        const sidesData = menuData.filter(brunchItems => brunchItems.description === "side");
        const menuOptions = ["Brunch", "drink", "side"];
        
        for (var i = 0; i < menuOptions.length; i++){

          if(menuOptions[i] === "Brunch"){

            let brunchImg = ["cinnamonrolls.jpeg", "smokedtroutdeviledeggs.jpeg", "chesapeakequiche.jpeg", "lemonblueberrypancake.jpeg",  "chickenandwaffles.jpeg", "shrimpbaconpestoomlet.jpeg", "beefbriskethash.jpeg", "biscuitsngravy.jpeg", "friedeggblt.jpeg", "pimentocheeseblt.jpeg"];
            renderMenuItems (brunchData, "#brunchDisplay", brunchImg);
            
          }
          else if (menuOptions[i] === "drink") {

            let drinkImg = ["mixyourownmimosa.jpeg", "coffee.jpeg"];
            renderMenuItems (drinksData, "#drinkDisplay", drinkImg);

          }
          else if (menuOptions[i] === "side"){

            let drinkImg = ["mixyourownmimosa.jpeg", "coffee.jpeg", "cinnamonrolls.jpeg", "smokedtroutdeviledeggs.jpeg", "chesapeakequiche.jpeg"];
            renderMenuItems (sidesData, "#sidesDisplay", drinkImg);

          }
        };
       
        
    });


    function renderMenuItems (data, display, menuImg) {

        for (var i = 0; i < data.length; i++){

          $(display).append(`

              <div class="col s6 m3 ">
                 <div class="card" style="width: 300px;">
                    <div class="card-image">
                      <img src="./img/${menuImg[i]}" width="200px" height="200px">
                      <span class="card-title" data-name = "${data[i].menu_item}">${data[i].menu_item}</span>
                      <a class="btn-floating halfway-fab waves-effect waves-light red chosenItems"><i class="material-icons">add</i></a>
                    </div>
                    <div class="card-content">
                    <select id = "quantity" class="browser-default quantity" style="width: 100px !important">
                          <option value="1">Quantity</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <hr>
                        <h6 class = "price" data-price = "${data[i].item_price}"><strong>Price : $${data[i].item_price}</strong></h6>
                    </div>
                </div>
              </div>
        `);

        };
    };
    
    function createOrder() {

      let quantity = parseInt($(this).parent(".card-image").siblings(".card-content").children(".quantity").val());
      let orderedItem = $(this).siblings(".card-title").data("name");
      let orderItemPrice = parseInt($(this).parent(".card-image").siblings(".card-content").children(".price").data("price"));
      
      let newOrder = {

        menu_items : orderedItem,
        quantities : quantity,
        price : orderItemPrice

      };

      menuItems.push(newOrder);
      console.log(menuItems.length);
      $("#cartAmount").append(`${menuItems.length}`)

      let newMenu = JSON.stringify(menuItems);
      
      let totalPrice = menuItems.map(price => price.price * price.quantities);
      let totalQuantity = menuItems.map(quantity => parseInt(quantity.quantities));
      console.log(totalPrice);

      let totalP = totalPrice.reduce(calculateTotal);
      let totalQ = totalQuantity.reduce(calculateTotal);
      
      orderObj = {

        userId : currentUserId,
        menu_item : newMenu,
        quantity : totalQ,
        total_price : totalP
      };
     
    };

    function createPost (){

      $.post("/api/order", orderObj).then(function(response){

        console.log("order Submitted");
    
       });

    };

    function calculateTotal(total, num){
      return total + num;
    }

    $(document).on("click", ".chosenItems", createOrder);

    $("#cartBtn").on("click", createPost);
    

});
