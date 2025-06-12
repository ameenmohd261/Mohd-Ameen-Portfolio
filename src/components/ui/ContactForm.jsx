import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { validateEmail } from '../../utils/helpers';
import Button from './Button';

const ContactForm = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    let errors = {};
    let isValid = true;
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email';
      isValid = false;
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormStatus({ submitting: true, submitted: false, error: null });

    // Simulate form submission (replace with actual EmailJS implementation)
    setTimeout(() => {
      console.log("Form data:", formData);
      
      // Simulate successful submission
      setFormStatus({ submitting: false, submitted: true, error: null });
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, submitted: false }));
      }, 5000);
    }, 1500);
  };

  const inputClasses = `w-full p-3 rounded-lg outline-none focus:ring-2 transition-all duration-300 ${
    theme === 'light'
      ? 'bg-white border border-gray-300 focus:ring-blue-500 text-gray-800'
      : 'bg-gray-800 border border-gray-700 focus:ring-blue-500 text-white'
  }`;
  
  const errorClasses = "text-red-500 text-sm mt-1";

  return (
    <div>
      {formStatus.submitted ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 mb-6 rounded-lg ${
            theme === 'light' ? 'bg-green-50 text-green-800' : 'bg-green-900/20 text-green-300'
          }`}
        >
          <div className="flex items-center">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="mr-2">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <p>Message sent successfully! I'll get back to you soon.</p>
          </div>
        </motion.div>
      ) : null}
      
      {formStatus.error ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 mb-6 rounded-lg ${
            theme === 'light' ? 'bg-red-50 text-red-800' : 'bg-red-900/20 text-red-300'
          }`}
        >
          <div className="flex items-center">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="mr-2">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p>{formStatus.error || 'Something went wrong. Please try again.'}</p>
          </div>
        </motion.div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className={`block mb-2 font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`${inputClasses} ${formErrors.name ? 'border-red-500' : ''}`}
            placeholder="John Doe"
          />
          {formErrors.name && <p className={errorClasses}>{formErrors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className={`block mb-2 font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${inputClasses} ${formErrors.email ? 'border-red-500' : ''}`}
            placeholder="john@example.com"
          />
          {formErrors.email && <p className={errorClasses}>{formErrors.email}</p>}
        </div>
        
        <div>
          <label htmlFor="subject" className={`block mb-2 font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`${inputClasses} ${formErrors.subject ? 'border-red-500' : ''}`}
            placeholder="Project Inquiry"
          />
          {formErrors.subject && <p className={errorClasses}>{formErrors.subject}</p>}
        </div>
        
        <div>
          <label htmlFor="message" className={`block mb-2 font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className={`${inputClasses} ${formErrors.message ? 'border-red-500' : ''}`}
            placeholder="Tell me about your project..."
          ></textarea>
          {formErrors.message && <p className={errorClasses}>{formErrors.message}</p>}
        </div>
        
        <Button
          type="submit"
          disabled={formStatus.submitting}
          fullWidth
          size="lg"
        >
          {formStatus.submitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : "Send Message"}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;