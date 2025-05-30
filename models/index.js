const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const Account = require("./account")(sequelize);
const Destination = require("./destination")(sequelize);

Account.hasMany(Destination, {
  foreignKey: "accountId",
  onDelete: "CASCADE",
});
Destination.belongsTo(Account, {
  foreignKey: "accountId",
});

module.exports = {
  sequelize,
  Account,
  Destination,
};
