import dotenv from 'dotenv';

const sgMail = require('@sendgrid/mail');

dotenv.config();

const { MAIL_USER, SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

/**
 *  Sends an email to user
 *
 * @param {string} to email address where to send mail
 * @param {string} subject of the email
 * @param {string} html content of the email
 */
export const sendEmail = ({ to, subject, text, html }) => {
  const options = {
    from: MAIL_USER,
    to,
    subject,
    text,
    html,
  };
  return sgMail.send(options).then(
    () => {},
    (error) => {
      logger.error(error);

      if (error.response) {
        logger.error(error.response.body);
      }
    }
  );
};
