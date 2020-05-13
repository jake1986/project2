
module.exports = function(sequelize, DataTypes){

    var Restaurant = sequelize.define("Restaurant", {

        restaurant_name : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                len : [1, 100]
            }
        },
        street : DataTypes.STRING,
        city : DataTypes.STRING,
        zipcode : DataTypes.INTEGER,
        phone : DataTypes.STRING
    });
    Restaurant.associate = function(models){

        Restaurant.hasMany(models.Menu , {
            onDelete : "CASCADE"
        });
    }
    return Restaurant;
}