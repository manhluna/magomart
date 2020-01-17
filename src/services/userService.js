var UserModel = require("./../models/userModel");
var { tranMail,tranSuccess, tranErrors, tranRecoverPassword } = require("../../lang/en");
var bcrypt = require("bcrypt");
var uuidv4 = require("uuid/v4");
var sendMail = require("./../config/mailer");
const saltRounds = 7;

/**
 * update password
 * @param {userId} id 
 * @param {data update} dataUpdate 
 */
var updatePhone = (id, dataUpdate) => {
    return new Promise(async (resolve, reject)=> {
        var currentUser = await UserModel.findUserById(id);
        if(!currentUser) {
            return reject(tranErrors.ACCOUNT_NOT_EXIST);
        }
        await UserModel.updatePhone(id, dataUpdate.phone);
        resolve(true);
    });
}

var updateAddress = (id, dataUpdate) => {
    return new Promise(async (resolve, reject)=> {
        var currentUser = await UserModel.findUserById(id);
        if(!currentUser){
            return reject(tranErrors.SERVER_ERR);
        }
        await UserModel.updateAddress(id, dataUpdate.address);
        resolve(true);
    });
}
// send mail recover password
var postRecoverPassword = (email, protocol, host) => {
    return new Promise(async (resolve, reject)=> {
        var currentUser = await UserModel.findByEmail(email);
        if(!currentUser){
            return reject(tranErrors.SERVER_ERR);
        }
        var token = uuidv4();
        await UserModel.createTokenForgetPassword(email, token);
        var CurUser = await UserModel.findOne({"local.email": email});
        var linkRecoverPassword = `${protocol}://${host}/user/${CurUser.local.tokenRecoverPassword}`;
        //send email
        sendMail(email , tranRecoverPassword.SUBJECT, tranRecoverPassword.TEMPLATE(linkRecoverPassword))
        .then((success) => {
            resolve(tranSuccess.send_email_password_success(email));
        })
        .catch(async (error) => {
            console.log(error);
            reject(tranMail.SEND_FAILED);
        });
        resolve(true);
    });
}
var verifyAccountForgetPassword = (tokenRecoverPassword) => {
    return new Promise( async (resolve, reject) => {
        var userByToken = await UserModel.findByTokenRecoverPassword(tokenRecoverPassword);
        if(!userByToken){
            return reject(tranErrors.TOKEN_NULL);
        };
        resolve(true);
    });
};
//set new password
var updatePassword = (tokenRecoverPassword, newPassword) => {
    return new Promise(async (resolve, reject)=> {
        var currentUser = await UserModel.findOne({"local.tokenRecoverPassword": tokenRecoverPassword});
        if(!currentUser){
            return reject(tranErrors.SERVER_ERR);
        }
        var salt = bcrypt.genSaltSync(saltRounds);
        await UserModel.updatePassword(tokenRecoverPassword, bcrypt.hashSync(newPassword, salt));
        resolve(true);
    });
}


module.exports = {
    updatePhone: updatePhone,
    updateAddress: updateAddress,
    postRecoverPassword: postRecoverPassword,
    verifyAccountForgetPassword: verifyAccountForgetPassword,
    updatePassword: updatePassword
};
