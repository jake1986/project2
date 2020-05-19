
module.exports = function(sequelize, DataTypes){

    var Menu = sequelize.define("Menu", {

       menu_item : {
           type : DataTypes.STRING,
           allowNull : false,
           validate : {
               len : [1, 100]
           }
       },
       item_price : {
           type : DataTypes.DECIMAL(10,2),
           allowNull : false
       },
       description : {
           type : DataTypes.STRING,
           allowNull : false
       }
       });
        return Menu;
}