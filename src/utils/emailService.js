import emailjs from 'emailjs-com';

// Replace these with your own EmailJS values
const SERVICE_ID = 'service_id';  // From EmailJS dashboard
const TEMPLATE_ID = 'template_id'; // From EmailJS dashboard
const USER_ID = 'user_id'; // From EmailJS dashboard

/**
 * Sends an email using EmailJS service
 * @param {Object} formData - Contains name, email, subject, message
 * @returns {Promise} - The email sending promise
 */
export const sendEmail = async (formData) => {
  const templateParams = {
    from_name: formData.name,
    reply_to: formData.email,
    subject: formData.subject,
    message: formData.message
  };

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      USER_ID
    );
    
    return {
      success: true,
      response
    };
  } catch (error) {
    console.error('Email send failed:', error);
    return {
      success: false,
      error
    };
  }
};