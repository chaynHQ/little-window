const nodemailer = require('nodemailer');
const { EMAIL_PASSWORD, EMAIL_ACCOUNT, EMAIL_TO } = require('../config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_ACCOUNT,
    pass: EMAIL_PASSWORD,
  },
});
// email sent if error with database
const databaseEmail = (str, dbErr) => {
  const mailOptions = {
    from: `${EMAIL_ACCOUNT}`,
    to: `${EMAIL_TO}`,
    subject: 'Little Window Database Error',
    text: `There's been an error ${str} in Little Window's database, please see the error message: ${dbErr} `,
  };

  transporter.sendMail(mailOptions, () => {
    // TODO: Logging
    // if (error) {
    //   console.log(error);
    // }
  });
};

module.exports = {
  databaseEmail,
};
