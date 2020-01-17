var UserModel = require("./../models/userModel");
var bcrypt = require("bcrypt");
var uuidv4 = require("uuid/v4");
var { tranErrors, tranSuccess, tranMail } = require("../../lang/en");
var sendMail = require("./../config/mailer");

var saltRounds = 7;
var register = async (email, password, protocol, host) => {
    return new Promise(async (resolve, reject) => {
        var userByEmail = await UserModel.findByEmail(email);
        if(userByEmail){
            if(!userByEmail.local.isActive){
                return reject(tranErrors.ACCOUNT_NOT_ACTIVE);
            };
            return reject(tranErrors.ACCOUNT_IN_USE);
        };
        var salt = bcrypt.genSaltSync(saltRounds);
        var userItem = {
            username: email.split("@")[0],
            local: {
                email: email,
                password: bcrypt.hashSync(password, salt),
                verifyToken: uuidv4()
            }
        };
        var user = await UserModel.createNew(userItem);
        var linkVerify = `${protocol}://${host}/verify/${user.local.verifyToken}`;
        //send email
        sendMail(email , tranMail.SUBJECT, tranMail.TEMPLATE(linkVerify))
        .then((success) => {
            resolve(tranSuccess.register_success(user.local.email));
        })
        .catch(async (error) => {
            await UserModel.removeById(user._id);
            console.log(error);
            reject(tranMail.SEND_FAILED);
        });
        resolve(tranSuccess.register_success(user.local.email));
    });
};

var verifyAccount = (token) => {
    return new Promise( async (resolve, reject) => {
        var userByToken = await UserModel.findByToken(token);
        if(!userByToken){
            return reject(tranErrors.TOKEN_NULL);
        };
        await UserModel.verifyUser(token);
        resolve(tranSuccess.ACCOUNT_ACTIVE);
    });
};

module.exports = {
    register: register,
    verifyAccount: verifyAccount
};
