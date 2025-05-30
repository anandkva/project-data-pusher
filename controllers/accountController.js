const { Account } = require("../models");
const { v4: uuidv4 } = require("uuid");

const createAccount = async (req, res) => {
  try {
    const { email, accountName, website } = req.body;
    const account = await Account.create({
      email,
      accountName,
      website,
      appSecretToken: uuidv4(),
    });
    res.status(201).json(account);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch accounts" });
  }
};
const getAccount = async (req, res) => {
  const account = await Account.findByPk(req.params.id);
  if (!account) return res.status(404).json({ error: "Not found" });
  res.json(account);
};

const updateAccount = async (req, res) => {
  const account = await Account.findByPk(req.params.id);
  if (!account) return res.status(404).json({ error: "Not found" });

  const { email, accountName, website } = req.body;
  await account.update({ email, accountName, website });
  res.json(account);
};

const deleteAccount = async (req, res) => {
  const account = await Account.findByPk(req.params.id);
  if (!account) return res.status(404).json({ error: "Not found" });

  await account.destroy();
  res.json({ message: "Account deleted" });
};

const getDestinationsByAccount = async (req, res) => {
  const account = await Account.findByPk(req.params.id, {
    include: "Destinations",
  });
  if (!account) return res.status(404).json({ error: "Account not found" });

  res.json(account.Destinations);
};

module.exports = {
  createAccount,
  getAllAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
  getDestinationsByAccount,
};
