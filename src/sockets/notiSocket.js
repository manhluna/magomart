

var updateUserPhone = (io) => {
    var clients = {};
    io.on("connection", (socket)=>{ 
        var currentUserId = socket.request.user._id;
        if(clients[currentUserId]){
            clients[currentUserId].push(socket.id)
        } else {
            clients[currentUserId] = [socket.id];
        } 
        socket.on("update-phone", (phoneUpdate)=>{
            if(clients[currentUserId]){
                clients[currentUserId].forEach( (socketId) => {
                    io.sockets.connected[socketId].emit("update-phone-success", phoneUpdate);
                });
            }
        }); 
        socket.on("disconnect", ()=> {
            clients[currentUserId] = clients[currentUserId].filter((socketId)=>{
                return socketId !== socket.id;
            });
            if(!clients[currentUserId].length){
                delete clients[currentUserId];
            }
        });
    });
    
}
var updateUserAddress = (io) => {
    var clients = {};
    io.on("connection", (socket)=>{ 
        var currentUserId = socket.request.user._id;
        if(clients[currentUserId]){
            clients[currentUserId].push(socket.id)
        } else {
            clients[currentUserId] = [socket.id];
        } 
        socket.on("update-address", async (address)=>{
            if(clients[currentUserId]){
                clients[currentUserId].forEach( (socketId) => {
                    io.sockets.connected[socketId].emit("update-address-success", address);
                });
            }
        }); 
        socket.on("disconnect", ()=> {
            clients[currentUserId] = clients[currentUserId].filter((socketId)=>{
                return socketId !== socket.id;
            });
            if(!clients[currentUserId].length){
                delete clients[currentUserId];
            }
        });
    });
    
}

module.exports = {
    updateUserPhone: updateUserPhone,
    updateUserAddress: updateUserAddress
};