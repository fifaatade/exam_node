const nodemailer = require("nodemailer");

const mailer = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "ulrichpaquin@gmail.com",
        pass: "walnylflaumjpjme"
    }
    
});


module.exports = mailer;