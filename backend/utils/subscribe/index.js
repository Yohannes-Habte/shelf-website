import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create Email Sender Function
const sendEmail = async (option) => {
  // Create Email transporter that sends email to the user
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // Ensure this is set
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Options for sending Email
  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: option.email,
    subject: option.subject,
    html: option.message,
  };

  try {
    console.log('Sending email with options:', mailOptions); // Debugging line
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail;
