require("dotenv").config()
var session = require("express-session");
var connectMongo = require("connect-mongo");

var mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://luna:${process.env.PASS_DB}@magomart-y5a4q.mongodb.net/Ecommercial?retryWrites=true`,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true },(err)=>{})

var MongoStore = connectMongo(session);


/**
 * save session in mongodb
 */
var sessionStore = new MongoStore({
    //url: `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    //url: 'mongodb+srv://luna:Liecoin1@magomart-y5a4q.mongodb.net/Ecommercial?retryWrites=true',
    mongooseConnection: mongoose.connection,
    autoReconnect: true
});
/**
 * config session
 * @param app from express module
 */
var configSession = (app)=>{
    app.use(session({
        key: process.env.SESSION_KEY,
        secret: process.env.SESSION_SECRET,
        store: sessionStore,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000*60*60*24, // 1 day
        }
    }));
};

module.exports = {
    configSession: configSession,
    sessionStore: sessionStore
};