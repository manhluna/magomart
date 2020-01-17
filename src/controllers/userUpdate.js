var { tranSuccess } = require("../../lang/en");
var {user} = require("../services/index");
var { validationResult } = require("express-validator/check");

var updatePhoneNow = async (req, res)=> {
    var errArr = [];
    var validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        var errors = Object.values(validationErrors.mapped());
        errors.forEach(item =>{
            errArr.push(item.msg);
        });
        return res.status(500).send(errArr);  
    };
    try {
        var updateUserItem = req.body;
        await user.updatePhone(req.user._id, updateUserItem);
        var result = {
            message: tranSuccess.POST_COMMENT_SUCCESS
        };
        return res.redirect("/review");
    } catch (error) {
        return res.status(500).send(error);
    }
};
var verifyAccountForgetPassword = async (req, res) =>{
    var errArr = [];
    req.session.tokenpass = req.params.tokenRecoverPassword;
    try {
        await user.verifyAccountForgetPassword(req.params.tokenRecoverPassword);
        return res.redirect("/user/new-password");
    } catch (error) {
        errArr.push(error);
        req.flash("errors", errArr);
        return res.redirect("/user/recover-password");
    }
};
var updateAddressNow = async (req, res)=> {
    var errArr = [];
    var validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        var errors = Object.values(validationErrors.mapped());
        errors.forEach(item =>{
            errArr.push(item.msg);
        });
        return res.status(500).send(errArr);  
    };
    try {
        var updateUserItem = req.body;
        await user.updateAddress(req.user._id, updateUserItem);
        var result = {
            message: tranSuccess.POST_COMMENT_SUCCESS
        };
        return res.redirect("/review");
    } catch (error) {
        return res.status(500).send(error);
    }
};
var RecoverPassword = async (req, res)=> {
    var errArr = [];
    var validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        var errors = Object.values(validationErrors.mapped());
        errors.forEach(item =>{
            errArr.push(item.msg);
        });
        req.flash("errors", errArr)
        return res.redirect("/user/recover-password");   
    };
    try {
        var emailRecoverPassword = req.body.email;
        await user.postRecoverPassword(emailRecoverPassword, req.protocol, req.get("host"));
        return res.redirect("/user/send-mail-password");
    } catch (error) {
        errArr.push(error);
        req.flash("errors", errArr);
        return res.status(500).send(error);
    }
};
var updateNewPassword= async (req, res)=> {
    var errArr = [];
    var validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        var errors = Object.values(validationErrors.mapped());
        errors.forEach(item =>{
            errArr.push(item.msg);
        });
        return res.status(500).send(errArr);  
    };
    try {
        var updateUserItem = req.body;
        await user.updatePassword(req.session.tokenpass, updateUserItem.new_password);
        var result = {
            message: tranSuccess.UPDATE_PASSWORD_SUCCESS
        };
        return res.redirect("/login");
    } catch (error) {
        return res.status(500).send(error);
    }
};



module.exports = {
    updatePhoneNow: updatePhoneNow,
    updateAddressNow: updateAddressNow,
    verifyAccountForgetPassword: verifyAccountForgetPassword,
    RecoverPassword: RecoverPassword,
    updateNewPassword: updateNewPassword
};
