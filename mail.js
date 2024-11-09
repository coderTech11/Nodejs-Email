const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

//create a transporter object
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

//Route to send mail
router.post("/send-email", async (req, res) => {
  const { recipient, subject, html } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: Array.isArray(recipient) ? recipient.join(",") : recipient,
    subject: subject,
    html: html,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.log("Error sending mail", error);
  }
});

module.exports = router;
