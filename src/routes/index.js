var express = require("express");
var {
    getHome,  
    getRegister,
    getLogin,
    postRegister,
    verifyAccount,
    getLogout,
    checkLogedIn,
    checkLogedOut,
    getConfirmMail,
    updateAddress,
    updatePhone,
    getRecoverPassword,
    RecoverPassword,
    verifyAccountForgetPassword,
    updateNewPassword,
    getUpdatePassword,
    getSendMailPassword,
    checkAdmin,
    getAbout,
    getGift,
    getContact
} = require("./../controllers/getRoute");
var { authValid, userValid } = require("./../validation/index");
var passport = require("passport");
var { initPassportLocal } = require("./../controllers/passport/local");

// Init all passport
initPassportLocal();
var router = express.Router();
/**
 * init routes 
 */
var initRouter = (app)=>{
    // page route
    router.get('/', getHome );
    // router.get('/about', getAbout );
    router.get('/confirm-mail', getConfirmMail );
    router.get('/register', checkLogedOut, getRegister );
    router.get('/login', checkLogedOut, getLogin );
    router.get('/verify/:token', checkLogedOut, verifyAccount );
    router.post('/register', checkLogedOut, authValid.register, postRegister);
    router.get('/user/gift', checkLogedIn, getGift);
    router.get('/user/contact', getContact);


    //login
    router.post('/login', checkLogedOut, passport.authenticate("local", {
        successRedirect: "/user/gift",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }), );

    router.get('/logout', checkLogedIn, getLogout);


    //dashboard
    router.put('/user/update-phone', checkLogedIn, userValid.updatePhone, updatePhone);
    router.put('/user/update-address', checkLogedIn, userValid.updateAddress,  updateAddress);

    router.get('/user/recover-password', checkLogedOut,  getRecoverPassword);
    router.get('/user/send-mail-password', checkLogedOut,  getSendMailPassword);
    router.post('/user/recover-password', checkLogedOut, userValid.postEmailRecover,  RecoverPassword);
    router.get('/user/new-password', checkLogedOut,  getUpdatePassword);
    router.get('/user/:tokenRecoverPassword', checkLogedOut,  verifyAccountForgetPassword);
    router.post('/user/update-password', checkLogedOut, userValid.checkNewPassword,  updateNewPassword);
    router.get('/*', function(req, res){
        res.redirect("/");
      });
    app.use("/", router);
};
module.exports = initRouter;

