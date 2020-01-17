var { validationResult } = require("express-validator/check");
var { auth } = require("./../services/index");


var register = async (req, res)=>{
    var errArr = [];
    var successArr = [];
    var validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        var errors = Object.values(validationErrors.mapped());
        console.log(errors);
        errors.forEach(item =>{
            errArr.push(item.msg);
        });
        req.flash("errors", errArr)
        return res.redirect("/register");  
    };

    try {
        var userCreateSuccess = await auth.register(req.body.email, req.body.password, req.protocol, req.get("host"));
        successArr.push(userCreateSuccess);
        req.flash("success", successArr);
        return res.redirect("/register");
    } catch (error) {
        errArr.push(error);
        req.flash("errors", errArr);
        return res.redirect("/register");
    };

      
};
var verifyAccount = async (req, res) =>{
    var errArr = [];
    var successArr = [];

    try {
        var verifySuccess = await auth.verifyAccount(req.params.token);
        successArr.push(verifySuccess);
        req.flash("success", successArr);
        return res.redirect("/login");
    } catch (error) {
        errArr.push(error);
        req.flash("errors", errArr);
        return res.redirect("/register");
    }
};
module.exports = {
    register: register,
    verifyAccount: verifyAccount
};
