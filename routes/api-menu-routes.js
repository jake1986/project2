var db = require("../models");

module.exports = function(app){

app.get("/api/restaurants", function(req, res){

    db.Menu.findAll({}).then(function(menuData){
     
      res.json(menuData);
      
    });
  });

}