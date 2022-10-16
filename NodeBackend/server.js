'use strict';

const express = require('express');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const winston = require('winston');
const passport = require('passport');
const passportSaml = require('passport-saml');
const cookieParser = require('cookie-parser');

const config = require('./config');

const app = express();

const _PORT = 3000;

//Key und Certifikat für TLS/SSL Verschlüsselung -> WO BEKOMMEN WIR DAS HER?
const _options = {
    key: fs.readFileSync("se.key"),
    cert: fs.readFileSync("se.crt")
};

/**  Set up APP */

app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'seserviceengineeringws2223'
}));
app.use(passport.initialize());
app.use(passport.session());

/** Logger */

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './errorLogs.log', level: 'error', maxsize: 5000000, maxFiles: 30})
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
        winston.format.json(),
        winston.format.colorize()
    )
});

/** Helpers */

const sendResponse = function(origin, res, success, message, data){
    res.json({
        success: success, message: message, data: data
    });
    if(success){
        logger.info(origin + " - " + message);
    }else {
        logger.error(origin + " - " + message);
    }
}

//ToDo async function ensureAuthenticated

/** ROUTES */

app.get('/', (req, res)=>{

});

app.get('/users', (req, res)=>{
    const origin = "GET /users";

    let userData = [
        {"id": "1", "name": "jechsmayr", "firstname": "viktoria"},
        {"id": "2", "name": "reissser", "firstname": "maximilian"},
        {"id": "3", "name": "sieber", "firstname": "maximilian"},
        {"id": "4", "name": "eisl", "firstname": "markus"}
    ];

    sendResponse(origin, res, true, "", userData);

    //aktivieren sobald login aktiv
    /*
    if(req.session.userid){
        sendResponse(origin, res, true, "", userData);
    }else{
        sendResponse(origin, res, false, "Bitte zuerst einloggen!");
    };
*/


});

/*
app.get('/login', (req, res, next)=>{
    passport.authenticate('', {response: res, failureRedirect: '/'})(req, res, next);
}, (req, res)=>{
    res.redirect('/');
});

app.get('/auth/openid/return', (req, res, next)=>{
    passport.authenticate('', {response: res, failureRedirect: '/'})(req, res, next);
}, (req, res)=>{
    res.redirect('/');
});

app.post('/auth/openid/return', (req, res, next)=>{
    passport.authenticate('', {response: res, failureRedirect: '/'})(req, res, next);
}, (req, res)=>{
    res.redirect('/');
});

app.get('/logout', (req, res)=>{
    req.session.destroy(err=>{
        req.logOut();
        res.redirect(config.destroySessionUrl);
    });
});
*/

/**
 * Create Server
 */

https.createServer(_options, app).listen(_PORT, ()=>{
    console.log("\n");
    console.log("-----------------------------------------");
    console.log('Server listening on port ' + _PORT +'!');
    console.log("-----------------------------------------");
    console.log("\n");
});