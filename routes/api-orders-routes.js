var db = require("../models");


module.exports = function (app) {

  app.post("/api/order", function (req, res) {

    db.Orders.create({

      UserId: req.body.userId,
      menu_items: req.body.menu_item,
      quantity: req.body.quantity,
      total_price: req.body.total_price

    }).then(function (data) {

      res.json(data);
    })

      .catch(function (err) {
        res.status(401).json(err);
      });

  });

  app.get("/api/order/:id", function(req, res){

    console.log(req.params.id);

    db.Orders.findAll({ include : db.User , where : { UserId : req.params.id} }).then(function(response){
      res.json(response);
    });

  });

  app.put("/api/orders/:id", function(req, res){
    
    db.Orders.update(req.body , {
      where : {
        id : req.params.id
      }
    }).then(function(data){
      res.json(data);
    });
  });

};
