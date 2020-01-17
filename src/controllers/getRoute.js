var {register, verifyAccount} = require("./register");
var { 
    updatePhoneNow, 
    updateAddressNow, 
    verifyAccountForgetPassword,
    RecoverPassword ,
    updateNewPassword
} = require("./userUpdate");

var getHome = (req, res)=>{
    res.render("index", {
        title: "Mago Mart | Home",
        user: req.user
    });
};
var getAbout = (req, res)=>{
    res.render("user/about", {
        title: "Mago Mart | About Us",
        user: req.user
    });
};
var getContact = (req, res)=>{
    res.render("user/contact", {
        title: "Mago Mart | Contact Us",
        user: req.user
    });
};
var getGift = (req, res)=>{
    res.render("user/gift", {
        title: "Mago Mart | Gifts",
        user: req.user
    });
};
var getRecoverPassword = (req, res)=>{
    res.render("authentication/recover-password", {
        title: "Mago Mart | Recove password",
        user: req.user
    });
};
var getSendMailPassword = (req, res)=>{
    res.render("authentication/send-mail", {
        title: "Mago Mart | Email Recover Password",
        user: req.user
    });
};
var getUpdatePassword = (req, res)=>{
    res.render("authentication/new-password", {
        title: "Mago Mart | Update New Password",
        user: req.user
    });
};
var getConfirmMail = (req, res)=>{
    res.render("auth/confirm-mail", {
        title: "Mago Mart | Confirm Email",
        user: req.user
    });
};

var getRegister = (req, res)=>{
        res.render("authentication/register", {
            title: "Mago Mart | Register",
            errors: req.flash("errors"),
            success: req.flash("success"),
            user: req.user
        });
    };
var getLogin = (req, res)=>{
        res.render("authentication/login", {
            title: "Mago Mart | Login",
            errors: req.flash("errors"),
            success: req.flash("success"),
            user: req.user
        });
    };
var getLogout = (req, res) => {
    req.logout();
    return res.redirect("/login");
};

var checkLogedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        return res.redirect("/login");
    };
    next();
};

var checkLogedOut = (req, res, next) => {
    if(req.isAuthenticated()){
        return res.redirect("/");
    };
    next();
};
var checkAdmin = (req, res, next) => {
    var isAdmin = req.user.role;
    if(isAdmin != "admin"){
        return res.redirect("/");
    }
    next();
}

module.exports = {
    getHome: getHome,
    getRegister: getRegister,
    getLogin: getLogin,
    postRegister: register,
    verifyAccount: verifyAccount,
    getLogout: getLogout,
    checkLogedIn: checkLogedIn,
    checkLogedOut: checkLogedOut,
    getConfirmMail: getConfirmMail,
    updatePhone: updatePhoneNow,
    updateAddress: updateAddressNow,
    getRecoverPassword: getRecoverPassword,
    RecoverPassword: RecoverPassword,
    verifyAccountForgetPassword: verifyAccountForgetPassword,
    updateNewPassword: updateNewPassword,
    getUpdatePassword: getUpdatePassword,
    getSendMailPassword: getSendMailPassword,
    checkAdmin: checkAdmin,
    getAbout: getAbout,
    getGift: getGift,
    getContact: getContact
};
