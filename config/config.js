require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "dev",
  port: process.env.PORT || 3000,
  sendEmailUSer: process.env.SEND_EMAIL_USER,
  sendEmailPass: process.env.SEND_EMAIL_PASS,
};
module.exports = { config };
