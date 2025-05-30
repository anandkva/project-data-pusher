const express = require("express");
const swaggerUI = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { sequelize } = require("./models");
const accountRoutes = require("./routes/accountRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const dataRoutes = require("./routes/dataRoutes");

const app = express();
app.use(express.json());

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "swagger.json"), "utf8")
);

const corsOptions = {
  origin: ["https://project-data-pusher.onrender.com"],
};

app.use(cors(corsOptions));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/accounts", accountRoutes);
app.use("/destinations", destinationRoutes);
app.use("/server", dataRoutes);

const PORT = 3000;

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Failed to sync DB:", err);
  });
