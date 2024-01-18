const nodemailer = require('nodemailer');
const EMAIL_TEMPLATE = require('../HTML/Email');
const ActivisionCode = require('../models/ActivisionCode');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    service: 'gmail',
    auth: {
        user: 'studiosstarplus@gmail.com',
        pass: "zyrb kvww rije bkbi"
    }

})

async function SendActivisionCode(email, user){

    const activisionCode = await new ActivisionCode({user: user._id});
    const token = await ActivisionCode.findOne({token: activisionCode.token});

    const activateLink = process.env.DOMAIN + '/auth/activate/' + activisionCode.token;

    const mailDetails = {
        from: 'studiosstarplus@gmail.com',
        to: email,
        subject: 'Activate your StarPlus account',
        html: EMAIL_TEMPLATE(activateLink, user.username),
    };

    const info = await transporter.sendMail(mailDetails);
    if (!token) await activisionCode.save();
    console.log("Message Sent")
}

module.exports = {SendActivisionCode}