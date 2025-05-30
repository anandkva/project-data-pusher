const axios = require("axios");

const sendToDestination = async (destination, data) => {
  const { url, httpMethod, headers } = destination;

  const config = {
    method: httpMethod.toLowerCase(),
    url,
    headers,
    ...(httpMethod === "GET" ? { params: data } : { data }),
  };

  try {
    const response = await axios(config);
    return { success: true, status: response.status };
  } catch (err) {
    console.error("Failed:", err.message);
    return { success: false, error: err.message };
  }
};

module.exports = { sendToDestination };
