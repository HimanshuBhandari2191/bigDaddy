const Subscriber = require('../models/Subscriber');
const sendEmail = require('../utils/sendEmail');

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(200).json({ message: "You're already subscribed!" });
    }

    await Subscriber.create({ email });

    try {
      await sendEmail({
        email,
        subject: 'Welcome to Big Daddy Tattoos - Here is your 10% off',
        message: `
          <h2>Welcome to Big Daddy Tattoos!</h2>
          <p>Use code <strong>WELCOME10</strong> for 10% off your first order.</p>
        `
      });
    } catch (emailErr) {
      console.error('Newsletter welcome email failed:', emailErr.message);
    }

    res.status(201).json({ message: 'Subscribed successfully! Check your email for 10% off.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { subscribe };
