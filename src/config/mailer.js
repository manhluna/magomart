var nodeMailer = require("nodemailer");

var adminMail = process.env.MAIL_USER;
var adminPassword = process.env.MAIL_PASSWORD;
var mailHost = process.env.MAIL_HOST;
var mailPort = process.env.MAIL_PORT;

var sendMail = (to, subject, htmlContent) => {
    var transport = nodeMailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: false, // use SSL-TLS
        auth: {
            user: adminMail,
            pass: adminPassword
        }
    });

    var options = {
        from: adminMail,
        to: to,
        subject: subject,
        html: htmlContent
    };
    return transport.sendMail(options);
};

module.exports = sendMail;