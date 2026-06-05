const nodemailer = require('nodemailer');
const dns = require('dns');

dns.setDefaultResultOrder('ipv4first');

const sendEmail = async ({ email, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      family: 4, // 🔥 CRITICAL FIX
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Big Daddy Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html: message,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`Email sent: ${info.response}`);

    return info;

  } catch (error) {
    console.error(`EMAIL FAILED:`, error);
    throw error;
  }
};

module.exports = sendEmail;