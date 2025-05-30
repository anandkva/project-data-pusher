const { Destination, Account } = require("../models");

const createDestination = async (req, res) => {
  try {
    const { accountId, url, httpMethod, headers } = req.body;

    if (!accountId || !url || !httpMethod || !headers) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const account = await Account.findByPk(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const destination = await Destination.create({
      accountId,
      url,
      httpMethod,
      headers,
    });

    res.status(201).json(destination);
  } catch (error) {
    console.error("Error creating destination:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.findAll();
    res.json(destinations);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDestinationsByAccountId = async (req, res) => {
  try {
    const { accountId } = req.params;
    const destinations = await Destination.findAll({
      where: { accountId: accountId },
    });
    if (destinations.length === 0) {
      return res
        .status(404)
        .json({ message: "No destinations found for this account" });
    }
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch destinations" });
  }
};

const getDestinationById = async (req, res) => {
  try {
    const { id } = req.params;

    const destination = await Destination.findByPk(id);

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.json(destination);
  } catch (error) {
    console.error("Error fetching destination by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const { url, httpMethod, headers } = req.body;

    const destination = await Destination.findByPk(id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    if (url) destination.url = url;
    if (httpMethod) destination.httpMethod = httpMethod;
    if (headers) destination.headers = headers;

    await destination.save();

    res.json(destination);
  } catch (error) {
    console.error("Error updating destination:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await Destination.findByPk(id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    await destination.destroy();

    res.json({ message: "Destination deleted successfully" });
  } catch (error) {
    console.error("Error deleting destination:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  createDestination,
  getAllDestinations,
  getDestinationById,
  getDestinationsByAccountId,
  updateDestination,
  deleteDestination,
};
