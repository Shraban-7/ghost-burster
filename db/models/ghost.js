'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ghost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ghost.hasMany(models.Booking, {
        foreignKey: "id",
      });
    }
  }
  Ghost.init(
    {
      room_no: DataTypes.INTEGER,
      // img: DataTypes.STRING,
      des: DataTypes.TEXT,
      type: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      isAvailable:DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "Ghost",
    }
  );
  return Ghost;
};