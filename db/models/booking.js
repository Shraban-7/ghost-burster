'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Booking.belongsTo(models.Ghost, {
        foreignKey: "ghostId",
      });
    }
  }
  Booking.init(
    {
      checkInDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      checkOutDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["approved", "rejected", "pending"],
        defaultValue: "pending",
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      ghostId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};