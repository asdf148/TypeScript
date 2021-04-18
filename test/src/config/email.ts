import nodemailer from "nodemailer";

const smtpTransport = nodemailer.createTransport({
    service: "GMAIL",
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PWD
    },
    tls: {
        rejectUnauthorized: false
    }
});

export default smtpTransport;