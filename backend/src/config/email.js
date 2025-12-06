import nodemailer from 'nodemailer';

export const createEmailTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = createEmailTransporter();

    const mailOptions = {
      from: 'noreplay@mernauth.com',
      to: email,
      subject: 'Welcome to MERN Auth System!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">Welcome to MERN Auth! 🎉</h1>
          </div>
          <div style="padding: 30px; background: #f9fafb; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; color: #1f2937;">Hi <strong>${name}</strong>,</p>
            <p style="font-size: 16px; color: #1f2937; line-height: 1.6;">
              Thank you for registering with our MERN Authentication System! We're excited to have you on board.
            </p>
            <p style="font-size: 16px; color: #1f2937; line-height: 1.6;">
              Your account has been successfully created and you can now access all features of our platform.
            </p>
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6366f1;">
              <h3 style="color: #6366f1; margin-top: 0;">Account Details:</h3>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0;"><strong>Registered:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            <p style="font-size: 16px; color: #1f2937; line-height: 1.6;">
              If you have any questions or need assistance, feel free to reach out to our support team.
            </p>
            <p style="font-size: 16px; color: #1f2937;">
              Best regards,<br>
              <strong>MERN Auth Team</strong>
            </p>
          </div>
          <div style="padding: 20px; background: #f3f4f6; text-align: center; color: #6b7280; font-size: 12px; border-radius: 0 0 8px 8px;">
            <p style="margin: 0;">© 2024 MERN Auth System. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${email}`);
    console.log(`📧 Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    throw error;
  }
};
