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
 * 上传文件并获取链接
 * @param file
 * @returns {null|*}
 */
function uploadFileAndGetUrl(file) {
    var link;
    if (file == null) {
        return null;
    }
    var data = new FormData();//必须是new FormData后台才能接收到
    data.append('file', file);// 添加文件，表单其他项也可添加

    $.ajax({
        url: "http://localhost:2000/upload",
        method: "POST",
        data: data,
        datatype: "json",
        async: false,
        cache: false,
        processData: false,
        contentType: false,
        success: function (result) {
            // console.log(result);
            if (result.code == 100) {
                link = result.extend.url;
                console.log("上传成功:"+link);
            } else {
                console.log("上传失败！");
            }
        },
        error: function (result) {
            console.log("upload fail");
        }
    });
    // console.log("返回链接：" + link);
    return link;
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