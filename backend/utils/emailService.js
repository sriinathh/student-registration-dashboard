const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (email, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: html,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log('Email error:', error);
    return false;
  }
};

const sendOTPEmail = async (email, otp, purpose = 'verification') => {
  const subject =
    purpose === 'verification'
      ? 'Student Registration Dashboard - Email Verification'
      : 'Student Registration Dashboard - Password Reset';

  const html =
    purpose === 'verification'
      ? `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">Email Verification</h1>
      </div>
      <div style="padding: 30px; background-color: #f9f9f9;">
        <p>Hello,</p>
        <p>Welcome to Student Registration Dashboard! Please verify your email address using the OTP below:</p>
        <div style="background-color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
          <h2 style="letter-spacing: 5px; color: #667eea; margin: 0;">${otp}</h2>
        </div>
        <p style="color: #666; font-size: 14px;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
        <p>If you didn't request this email, please ignore it.</p>
        <hr style="border: none; border-top: 1px solid #ddd;" />
        <p style="color: #999; font-size: 12px;">Student Registration Dashboard © 2026</p>
      </div>
    </div>
    `
      : `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">Password Reset</h1>
      </div>
      <div style="padding: 30px; background-color: #f9f9f9;">
        <p>Hello,</p>
        <p>Use the OTP below to reset your password:</p>
        <div style="background-color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
          <h2 style="letter-spacing: 5px; color: #667eea; margin: 0;">${otp}</h2>
        </div>
        <p style="color: #666; font-size: 14px;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
        <p>If you didn't request this email, please ignore it.</p>
        <hr style="border: none; border-top: 1px solid #ddd;" />
        <p style="color: #999; font-size: 12px;">Student Registration Dashboard © 2026</p>
      </div>
    </div>
    `;

  return await sendEmail(email, subject, html);
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = { sendOTPEmail, generateOTP, sendEmail };
