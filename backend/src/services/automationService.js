import AutomationEvent from '../models/AutomationEvent.js';
import EmailList from '../models/EmailList.js';
import { sendWelcomeEmail } from '../config/email.js';

export const runAutomation = async (data) => {
  try {
    // 1. Save automation event in MongoDB
    await AutomationEvent.create({
      userId: data.userId,
      name: data.name,
      email: data.email,
      eventType: 'user_signup',
      timestamp: new Date(),
    });

    // 2. Send real welcome email via Mailtrap
    try {
      await sendWelcomeEmail(data.email, data.name);
    } catch (emailError) {
      console.warn('⚠️ Email sending failed, but signup completed:', emailError.message);
    }

    // 3. Store email into EmailList collection
    try {
      await EmailList.create({ email: data.email });
    } catch (error) {
      // Email might already exist, that's okay
      console.log(`Email ${data.email} already in EmailList`);
    }

    return true;
  } catch (error) {
    console.error('Automation error:', error.message);
    throw error;
  }
};
