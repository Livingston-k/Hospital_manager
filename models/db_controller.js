var mysql = require('mysql')
var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');

// CONNECT TO THE DATABASE
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'hospital_manager',
});
con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

// DATABASE MODELS
// Signup model
module.exports.signup = function (username, email, password, status, callback) {
    var query =
        "INSERT INTO `users`(`username`,`email`,`password`,`email_status`) VALUES ('" +
        username +
        "','" +
        email +
        "','" +
        password +
        "','" +
        status +
        "')";
    con.query(query, callback);
    console.log(query);
};

// Verify  model
module.exports.verify = function (username, email, token, callback) {
    var query =
        "insert into `verify` (`username`,`email`,`token`) values ('" +
        username +
        "','" +
        email +
        "','" +
        token +
        "')";
    con.query(query, callback);
};

// Verify Email model
module.exports.getuserid = function (email, callback) {
    var query = "select * from verify where email = '" + email + "' ";
    con.query(query, callback);
};

