const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const accountRoutes = require("./routes/accountRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const dataRoutes = require("./routes/dataRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/accounts", accountRoutes);
app.use("/destinations", destinationRoutes);
app.use("/server", dataRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(3000, () =>
    console.log("Server running on http://localhost:3000")
  );
});
