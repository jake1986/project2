
module.exports = function(sequelize, DataTypes){

    var Menu = sequelize.define("Menu", {

       appetizer_name : {
           type : DataTypes.STRING,
           allowNull : false,
           validate : {
               len : [1, 100]
           }
       },
       appetizer_price : {
           type : DataTypes.DECIMAL,
           allowNull : false
       },
       entree_name : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            len : [1, 100]
        }
    },
        entree_price :  {
            type : DataTypes.DECIMAL,
            allowNull : false
        }
    });

    Menu.associate = function(models){

        Menu.belongsTo(models.Restaurant, {

            foreignKey: {
              allowNull: false
              
            }
          });
    }
    return Menu;
}