const express = require("express");
const router = express.Router();
const {
  createAccount,
  getAllAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
  getDestinationsByAccount,
} = require("../controllers/accountController");

router.post("/", createAccount);
router.get("/", getAllAccounts);
router.get("/:id", getAccount);
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);
router.get("/:id/destinations", getDestinationsByAccount);

module.exports = router;
