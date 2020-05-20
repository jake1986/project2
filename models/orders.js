
module.exports = function(sequelize, DataTypes){

    var Orders = sequelize.define("Orders", {

       menu_items : DataTypes.TEXT,
       quantity : DataTypes.INTEGER,
       total_price : DataTypes.DECIMAL(10,2)
        
    });
    Orders.associate = function(model){

        Orders.belongsTo(model.User , {
            foreignKey : {
                allowNull : false
            }, 
            onDelete : "CASCADE"
        });
        
    }
    return Orders;
}