const axios = require("axios");

async function getData() {
  try {
    const res = await axios.post(
      "https://line-noti-api.vercel.app/api/transactions/kbank",
      {
        account: process.env.ACCOUNT_NAME,
        xkey: process.env.XKEY,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data; 
  } catch (error) {
    console.error("getData error:", error.response?.data || error.message);
    return null;
  }
}

async function check(amount) {
  const d = await getData();
  if (!d || !d.data) return false;

  const found = d.data.some((item) => Number(item.amount) === Number(amount));
  return found;
}

module.exports = { check };
