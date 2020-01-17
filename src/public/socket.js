
$(document).on("click", "#btn-add-phone", function(){
    let phoneUpdate = $("#add-phone-content").val();
    $.ajax({
        url: "/user/update-phone",
        type: "put",
        data: {
            phone: phoneUpdate
        },
        success: function(result){
            socket.emit("update-phone", phoneUpdate);
        },
        error: function(error){
            console.log(error);
        }
    });
});
$(document).ready(function(){
    setTimeout(function() {
        $('#closeAlert').css('display', 'none');
      }, 7000);
});
$(document).on("click", "#btn-add-address", function(){
    let state = $("#state").val();
    let city = $("#city").val();
    let country = $("#country").val();
    let address = state + ", " + city + ", " + country;
    $.ajax({
        url: "/user/update-address",
        type: "put",
        data: {
            address: address
        },
        success: function(result){
            console.log("ok");
            socket.emit("update-address", address);
        },
        error: function(error){
            console.log(error);
        }
    });
});

socket.on("update-phone-success", (data)=>{
    $("#add-phone").css("dislay", "none");
    $("#phone-user").css("dislay", "block");
    $("#phone-user").html(data);
});
socket.on("update-address-success", (data)=>{
    $("#add-address").css("dislay", "none");
    $("#user-address").css("dislay", "block");
    $("#user-address").html(data.address);
});