const mailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SendMail = (myMail, userMail, uname) => {

    const info = {
        name: uname,
        email: userMail
    }

    const token = jwt.sign(info, process.env.SECRET_TOKEN);

    const transporter = mailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: myMail,
            pass: "2002yash2002"
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: myMail,
        to: userMail,
        subject: "Chatroom 2.0 Account Activation",
        html: `
        <h2>Welcome ${uname}</h2>
        <hr/>
        <p>Please verify your account by clicking on following link</p>
        <h6>
        <a href="http://localhost:3000/user/activate/:${token}/:${uname}">https://chatroom2.0/accountActivation/${token}.com</a>
        </h6>
        `
    }

    transporter.sendMail(mailOptions, (error) => {
        if (error) console.log("Email not sent!! ", error);
        else console.log("Email sent successfully");
    })
}

module.exports = SendMail;

