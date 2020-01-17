var express = require("express");
var expressEjsExtend = require("express-ejs-extend");

/**
 * config view engine
 */
var viewConfig = (app)=>{
    app.use(express.static("./src/public"));
    app.engine("ejs", expressEjsExtend);
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
};

module.exports = viewConfig;