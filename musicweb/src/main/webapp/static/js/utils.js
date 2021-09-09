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