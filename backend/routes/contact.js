const router = require('express').Router();
const nodemailer = require('nodemailer');

// create a transporter using your email service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// contact form submission endpoint
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'alexfarrell1014@gmail.com',
      subject: `new contact form message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <h3>new contact form message</h3>
        <p><strong>name:</strong> ${name}</p>
        <p><strong>email:</strong> ${email}</p>
        <p><strong>message:</strong></p>
        <p>${message}</p>
      `
    };

    // send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'message sent successfully' });
  } catch (error) {
    console.error('error sending email:', error);
    res.status(500).json({ error: 'failed to send message' });
  }
});

module.exports = router; 