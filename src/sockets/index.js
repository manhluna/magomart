var {
    postSwap,
    postWithdraw,
    postPrice,
    updateUserPhone,
    updateUserAddress,
    postDeposit
} = require("./notiSocket");
/**
 * @param io from socket.io libs
 */

var initSockets = (io) => {
    updateUserPhone(io);
    updateUserAddress(io);
};

module.exports = initSockets;