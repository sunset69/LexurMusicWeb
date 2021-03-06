function show_register_modal() {
    $("#registerModal").modal({
        backdrop: 'static'
    });
}

function getUserInfo() {
    var user = {};
    var avatarFile = $("#registercAvatarForm")[0].files[0];
    if (avatarFile != null) {
        var avatarUrl = uploadFileAndGetUrl(avatarFile);
        user.avatar = avatarUrl;
    }
    user.mail = $("#registerMailForm").val();
    user.password = $("#registerPasswordForm").val();
    user.nickname = $("#registerNicknameForm").val();
    user.phone = $("#registerPhoneForm").val();
    console.log(user);
    return user;
}

function registerUser(user) {
    if (user.mail == null || user.mail == "") {
        // console.log("账户不能为空");
        alertInfo("账户不能为空");
        return false;
    }
    if (user.password == null || user.password == "") {
        // console.log("密码不能为空");
        alertInfo("密码不能为空");
        return false;
    }

    $.ajax({
        url: "/admin/addUser",
        method: "POST",
        data: user,
        success: function (result) {
            console.log(result);
            if (result.code == 100){
                alertInfo("注册成功");
            }else if (result.code == 200 ){
                alertInfo("注册失败\n"+result.msg);
            }else {
                alertInfo("注册失败!");
            }
        },
        error: function () {
            // console.log("连接服务器失败");
            alertInfo("连接服务器失败");
        }
    });
}