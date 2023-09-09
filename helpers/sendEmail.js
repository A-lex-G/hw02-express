const nodemailer = require('nodemailer');
require('dotenv').config();

// const{META_PASSWORD, META_EMAIL} = process.env;
const{UKR_NET_MAIL, UKR_NET_PASS} = process.env;

const nodemailerConfig = {
    
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
        user: UKR_NET_MAIL,
        pass: UKR_NET_PASS,
    }
}

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async(data) => {

    const email = {...data, from: UKR_NET_MAIL};

    transport.sendMail(email);

    return true;
}

module.exports = sendEmail;