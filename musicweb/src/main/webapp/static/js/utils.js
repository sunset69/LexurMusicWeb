/**
 * 正则检查
 * @param ret
 * @param str
 * @returns {boolean}
 */
function retCheck(ret,str) {
    return ret.test(str)?true:false;
}

/**
 * 邮箱检查
 * @param mail
 * @returns {boolean}
 */
function checkMail(mail) {
    var ret = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    return retCheck(ret,mail)?true:false;
}

/**
 * 用户名检查
 * 要求用户名仅包含字母数字下划线，且3-16位
 * @param username
 * @returns {boolean}
 */
function chekUsername(username) {
    var ret = /^[a-z0-9_-]{3,16}$/;
    return retCheck(ret,username)?true:false;
}

/**
 * 链接检查
 * @param url
 * @returns {boolean}
 */
function checkUrl(url) {
    var ret = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return retCheck(ret,url)?true:false;
}

/**
 * 检查电话
 * @param phone
 * @returns {boolean}
 */
function checkPhone(phone) {
    var ret = new RegExp(/^1[34578]\d{9}$/);
    return retCheck(ret,phone)?true:false;
}

/**
 * 上传文件并获取链接
 * @param file
 * @returns {null|*}
 */
// function uploadFileAndGetUrl(file) {
//     console.log("uploadFileAndGetUrl");
//     var fileInfo;
//     var link;
//     if (file == null) {
//         return null;
//     }
//     var data = new FormData();//必须是new FormData后台才能接收到
//     data.append('file', file);// 添加文件，表单其他项也可添加
//
//     $.ajax({
//         url: "http://localhost:2000/upload",
//         method: "POST",
//         data: data,
//         datatype: "json",
//         async: false,
//         cache: false,
//         processData: false,
//         contentType: false,
//         success: function (result) {
//             console.log("上传成功")
//             console.log(result);
//             if (result.code == 100) {
//                 fileInfo = result.extend.fileInfo;
//                 link = fileInfo.url;
//                 console.log("上传成功:"+link);
//             } else {
//                 console.log("上传失败！");
//             }
//         },
//         error: function (result) {
//             console.log("upload fail");
//         }
//     });
//     // console.log("返回链接：" + link);
//     // console.log(fileInfo);
//     return link;
// }
function uploadFileAndGetUrl(file) {
    var url = null;
    if (file == null){
        console.log("文件为空");
        return null;
    }else {
        var data = new FormData();
        data.append("file",file);
        $.ajax({
            url: "http://localhost:2000/upload",
            method: "POST",
            data: data,
            async: false,
            datatype: "json",
            async: false,
            cache: false,
            processData: false,
            contentType: false,
            success: function (result) {
                console.log(result);
                if (result.code == 100){
                    url = result.extend.fileInfo.url;
                    console.log("上传成功:"+url);
                }
            },
            error: function () {
                console.log("连接服务器失败");
            }
        });
        return url;
    }
}

/**
 * 加载分类
 * @param element
 * @param index 默认选择的genreId
 */
function loadGenre(element,index = 1) {
    $.ajax({
        url: "/genre/page",
        method: "GET",
        success: function (result) {
            // console.log(result);
            $(element).empty();
            $.each(result.extend.genreList, function () {
                var optionEle = $("<option></option>").append(this.name).val(this.id);
                optionEle.appendTo(element);
            });
            $(element+" option[value="+index+"]").attr("selected", true);
        }
    });
}

/**
 * 通过id获取分类信息
 * @param id
 */
function getGenreById(id) {
    $.ajax({
        url: "/genre/getGenre",
        method: "GET",
        data: {id:id},
        success:function (result) {
            // console.log(result);
            if (result.code == 100){
                return result.extend.genre;
            }else {
                return null;
            }
        },
        error: function () {
            return null;
        }
    });
}

/**
 * 检查邮箱重复
 * @param mail
 * @param callback
 * @returns {boolean}
 */
function checkUserMailRepeat(mail,callback) {
    if (mail == null){
        return false;
    }
    $.ajax({
        url: "/user/checkMail",
        method: "GET",
        data: {
            mail: mail
        },
        success: function (result) {
            if (result.code == 100 ){
                console.log("邮箱可用");
                return true;
            }else {
                console.log("邮箱不可用");
                callback("邮箱重复，不可用");
                return false;
            }
        },
        error: function () {
            console.log("连接服务器失败");
            callback("连接服务器失败");
            return false;
        }
    });
}

/**
 * 上传音乐
 * @param song
 * @param callback
 */
function uploadSong(song,callback) {
    $.ajax({
        url: "/song/addSong",
        method: "POST",
        data: song,
        success: function (result) {
            console.log(result);
            if (result.code == 100){
                callback("上传成功");
                return true;
            }else {
                callback(result.msg);
                return false;
            }
        },
        error: function () {
            callback("连接服务器失败");
            return false;
        }
    });
}

/**
 * 上传用户
 * @param user
 * @param callback
 */
function uploadUser(user,callback) {
    $.ajax({
        url: "/admin/addUser",
        method: "POST",
        data: user,
        success: function (result) {
            console.log(result);
            if (result.code == 100){
                callback("上传成功");
                return true;
            }else {
                callback(result.msg);
                return false;
            }
        },
        error: function () {
            callback("连接服务器失败");
            return false;
        }
    });
}

/**
 * 上传分类
 * @param genre
 * @param callback
 */
function uploadGenre(genre,callback) {
    $.ajax({
        url: "/genre/addGenre",
        method: "POST",
        data: genre,
        success: function (result) {
            console.log(result);
            if (result.code == 100){
                callback("上传成功");
                return true;
            }else {
                callback(result.msg);
                return false;
            }
        },
        error: function () {
            callback("连接服务器失败");
            return false;
        }
    });
}


/**
 * 提示模态框
 * @param info
 */
function alertInfo(info) {
    // console.log("模态框提示"+info);
    if ($("#alert_modal").length == 0){
        // 创建模态框
        var alertModal = $('<div class="fade modal"role=dialog id=alert_modal tabindex=-1><div class=modal-dialog role=document><div class=modal-content><div class=modal-header><h4 class=modal-title>提示信息</h4></div><div class=modal-body><p>信息</div></div></div></div>');
        alertModal.appendTo("body");
        console.log("添加模态框");
    }
    $("#alert_modal p").text(info);
    $("#alert_modal").modal('show');
}