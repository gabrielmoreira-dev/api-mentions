const express = require('express')
const app = express()

const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(
    process.env.DATABASE_CONNECTION_STRING,
    {
        useUnifiedTopology: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }
);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
            'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const Mention = require('./models/mention')

const indexRoutes = require('./routes/index-routes')
app.use('/', indexRoutes)

const mentionRoutes = require('./routes/mention-routes')
app.use('/mentions', mentionRoutes)

module.exports = app