const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ email, subject, message }) => {
  try {
    const { data, error } = await resend.emails.send({
      // Use your verified domain once set up, e.g. 'Big Daddy Support <support@yourdomain.com>'
      // Until a domain is verified in Resend, this can only send to the email you signed up with.
      from: process.env.RESEND_FROM_EMAIL || 'Big Daddy Support <onboarding@resend.dev>',
      to: email,
      subject,
      html: message,
    });

    if (error) {
      console.error('EMAIL FAILED:', error);
      throw new Error(error.message || 'Failed to send email');
    }

    console.log(`Email sent: ${data.id}`);
    return data;

  } catch (error) {
    console.error(`EMAIL FAILED:`, error);
    throw error;
  }
};

module.exports = sendEmail;