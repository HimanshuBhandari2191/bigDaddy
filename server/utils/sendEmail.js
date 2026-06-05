const nodemailer = require('nodemailer');
const dns = require('dns');

// Prefer IPv4 to bypass glitchy local IPv6 routes
dns.setDefaultResultOrder('ipv4first');

const sendEmail = async ({ email, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Must be false for port 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Ensure this is a 16-character App Password
      },
      tls: {
        // Do not fail on invalid/unauthorized certificates (helps bypass local network filters)
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
      },
      connectionTimeout: 10000, // 10 seconds timeout limit
    });

    const mailOptions = {
      from: `"Big Daddy Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send email to ${email}: ${error.message}`);
  }
};

module.exports = sendEmail;