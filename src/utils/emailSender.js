const nodemailer = require('nodemailer');
const logger = require('./logger');

module.exports = ({ senderInfo, reportEmails }, emailMessage) => () => {
  const transporter = nodemailer.createTransport({
    service: senderInfo.service,
    auth: senderInfo.auth,
  });
  const mailOptions = {
    from: senderInfo.auth.user,
    subject: 'Alert report',
    text: `${emailMessage}`,
  };
  reportEmails.forEach((emailAddress) => {
    const options = { ...mailOptions, to: emailAddress };
    transporter.sendMail(options, (error) => {
      if (error) {
        logger.error(error);
      } else {
        logger.info(`Email sent to: ${options.to}`);
      }
    });
  });
};
