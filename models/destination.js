const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Destination", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    accountId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    httpMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    headers: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });
};
