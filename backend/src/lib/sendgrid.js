import sgMail from '@sendgrid/mail';
import ENV from '../lib/env.js';

const FROM_EMAIL = ENV.FROM_EMAIL || 'test@example.com';
sgMail.setApiKey(ENV.SENDGRID_API_KEY);

const msg = {
  to: `${to_email}`, // Change to your recipient
  from: `${FROM_EMAIL}`, // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

sgMail.send(msg)
  .then(() => {
    console.log('Email sent');
  })
  .catch((error) => {
    console.error(error);
  });
