$(document).ready(function() {

  let currentUser;
  
  $.get("/api/user_data").then(function(data) {

    currentUser = data.firstName + " " + data.lastName;
    
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
                      <span class="card-title">${data[i].menu_item}</span>
                      <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
                    </div>
                    <div class="card-content">
                    <select id = "quantity" class="browser-default" style="width: 100px !important">
                          <option value="" disabled selected>Quantity</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                        <hr>
                        <h6><strong>Price : $${data[i].item_price}</strong></h6>
                    </div>
                </div>
              </div>
        `);

        };
    };

});
