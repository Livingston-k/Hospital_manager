var express = require('express')
var router = express.Router()
var db = require.main.require('../models/db_controller')
var mysql = require('mysql')
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer')
var randomToken = require('random-token')
var { check, validationResult } = require('express-validator')
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.post('/',
    [
        check('username').isEmpty().withMessage("Username is required"),
        check('password').isEmpty().withMessage("password is required"),
        check('email').isEmpty().withMessage("email is required"),
    ], (req, res) => {
        // const errors = validationResult(req);
        // if (!errors) {
        //     return res.status(422).json({ errors: errors.array() });
        // }
        var email_starus = 'not_verified'
        var email = req.body.email
        var username = req.body.username
        var password = req.body.password
        db.signup(username, email, password, email_starus)
        var token = randomToken(8)
        db.verify(username, email, token)
        db.getuserid(email, function (err, result) {
            var id = result[0].id;
            var output =
                `
            <p>Dear   ` +
                username +
                `, </p>
            <p>Thanks for sign up. Your verification id and token is given below :  </p>
           
            <ul>
                <li>User ID: ` +
                id +
                `</li>
                <li>Token: ` +
                token +
                `</li>
            </ul>
            <p>verify Link: <a href="http://localhost:3000/verify">Verify</a></p>
            
            <p><strong>This is an automatically generated mail. Please do not reply back.</strong></p>
            
            <p>Regards,</p>
            <p>H Manager</p>
        `;

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 465,
                secure: true,
                auth: {
                    user: "kaddulivingston@gmail.com",
                    pass: 'wonders??2022',
                },
            });
            var mailOptions = {
                from: "noreply@hospitalmanager.com",
                to: email,
                subject: "Email Verification", // Subject line
                html: output, // plain text body
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    return console.log(err);
                }
                console.log(info);
            });

            res.send("Check you email for token to verify");
        });
    })

module.exports = router