

$(document).ready(function () {


    $.get("/api/menus").then(function (menuData) {

        console.log(menuData);
        renderMenu(menuData);
    });

    function renderMenu(menuData) {

        let menuImg = ["cinnamonrolls.jpeg", "smokedtroutdeviledeggs.jpeg", "chesapeakequiche.jpeg", "lemonblueberrypancake.jpeg",  "chickenandwaffles.jpeg", "shrimpbaconpestoomlet.jpeg", "beefbriskethash.jpeg", "biscuitsngravy.jpeg", "friedeggblt.jpeg", "pimentocheeseblt.jpeg", "mixyourownmimosa.jpeg", "coffee.jpeg"];


        for (var i = 0; i < menuData.length; i++) {

            $("#menuDisplay").append(`

            <div class="col s12 16">
                <div class="card">
                    <div class="card-image">
                        <img src="./img/${menuImg[i]}" alt="">
                        <a href="" class="halfway-fab btn-floating pink pulse">
                            <i class="material-icons">favorite</i>
                        </a>
                    </div>
                    <div class="card-content">
                        <span class="card-title">${menuData[i].menu_item + " " + menuData[i].item_price}</span>
                        <p>Smoked beef brisket hash, two eggs over easy, tomato remoulade, buttermilk biscuit</p>
                    </div>
                </div>
            </div>
            
            `)

        }

    };
});