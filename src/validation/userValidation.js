var {check} = require("express-validator/check");
var { tranValidation } = require("../../lang/en");

var updatePhone = [
    check("phone", tranValidation.UPDATE_PHONE)
        .optional()
        .matches(/^(0)[0-9]{9,10}$/),   
];
var updateAddress = [
    check("address", tranValidation.UPDATE_ADDRESS)
        .optional()
        .isLength({min:3, max: 40})
];
var postEmailRecover = [
    check("email", tranValidation.EMAIL_INCORRECT)
        .isEmail()
        .trim()
];
var checkNewPassword = [
    check("new_password", tranValidation.PASSWORD_INCORRECT)
        .isLength({ min: 8})
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,}$/),
    check("new_re_password", tranValidation.PASSWORD_CONFIRM_INCORRECT)
        .custom((value, {req})=> value === req.body.new_password)
];

module.exports = {
    updatePhone: updatePhone,
    updateAddress: updateAddress,
    postEmailRecover: postEmailRecover,
    checkNewPassword: checkNewPassword
};