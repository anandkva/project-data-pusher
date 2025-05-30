const express = require("express");
const router = express.Router();
const {
  createDestination,
  getAllDestinations,
  getDestinationsByAccountId,
  getDestinationById,
  updateDestination,
  deleteDestination,
} = require("../controllers/destinationController");

router.post("/", createDestination);
router.get("/", getAllDestinations);
router.get("/account/:accountId", getDestinationsByAccountId);
router.get("/:id", getDestinationById);
router.put("/:id", updateDestination);
router.delete("/:id", deleteDestination);

module.exports = router;
