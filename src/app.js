require('dotenv').config();
var express = require("express");
var connectDB = require("./config/connectDB");
var viewConfig = require("./config/viewConfig");
var initRouter = require("./routes/index");
var bodyParser = require("body-parser");
var connectFlash = require("connect-flash");
var { configSession, sessionStore } = require("./config/session");
var passport = require("passport");
var http = require("http");
var socketio = require("socket.io");
var initSockets = require("./sockets/index");
var passportSocketIo = require("passport.socketio");
var cookieParser = require("cookie-parser");
//init app
var app = express();
// init server with socket.io
var server = http.createServer(app);
var io = socketio(server);
//config database
connectDB();
//config session
configSession(app);
//config view engine
viewConfig(app);
//config body parseur
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Enable err messages
app.use(connectFlash());
app.use(cookieParser());
//config passport
app.use(passport.initialize());
app.use(passport.session());
//config routes
initRouter(app);
io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    success: (data, accept) => {
        if(!data.user.logged_in){
            return accept("Invalid User", false);
        }
        return accept(null, true);
    },
    fail: (data, message, error, accept) => {
        if(error){
            console.log("failed connection to socket.io: ", message );
            return accept(new Error(message), false);
        }
    }
}));

//config socket;
initSockets(io);


server.listen(process.env.APP_PORT, ()=>{
    console.log(` listening on port: ${process.env.APP_PORT}`);
});
