const nodemailer = require("nodemailer");
require("dotenv").config();
const createContact = async (name, email, address, helpRequest) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "regarding the order from srm university!",
      text: `Hello ${name},deliver to this address:"${address}",\n\nWe have received your message: "${helpRequest}"\n\nWe'll get back to you shortly.`,
    };
    
    const result = await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending mail:", error);
    return { success: false, error: "Failed to send email" };
  }
};

module.exports = { createContact };