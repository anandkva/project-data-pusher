const { Account } = require("../models");
const { sendToDestination } = require("../utils/httpClient");

const handleIncomingData = async (req, res) => {
  try {
    const token = req.headers["cl-x-token"];
    const data = req.body;

    if (!token) {
      return res.status(401).json({ message: "Un Authenticate" });
    }

    if (!data || typeof data !== "object") {
      return res.status(400).json({ message: "Invalid Data" });
    }

    const account = await Account.findOne({
      where: { appSecretToken: token },
      include: "Destinations",
    });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const results = await Promise.all(
      account.Destinations.map((dest) => sendToDestination(dest, data))
    );

    const failed = results
      .map((r, index) =>
        !r.success
          ? {
              destination: account.Destinations[index].url,
              error: r.error,
            }
          : null
      )
      .filter(Boolean);

    if (failed.length > 0) {
      return res.status(207).json({ message: "Partial success", failed });
    }

    res.json({ message: "Data pushed successfully" });
  } catch (error) {
    console.error("Unexpected error in handleIncomingData:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  handleIncomingData,
};
