var db = require("../models");


module.exports = function(app){

app.post("/api/order", function(req, res){

    db.Orders.create({

      UserId : req.body.userId,
      menu_items : req.body.menu_item,
      quantity : req.body.quantity,
      total_price : req.body.total_price

    }).then(function(data) {

      res.json(data);
    })

    .catch(function(err) {
      res.status(401).json(err);
    });

  });
  app.get("/api/order", function(req, res){

    db.Orders.findAll({ include : db.User
      
      
    }).then(function(response){
      res.json(response);
    });

  });

}
  