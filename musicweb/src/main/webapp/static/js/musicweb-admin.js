/**
 * 展示提示信息
 * @param info
 */
function info_modal(info) {
    $("#info_modal .modal-body p").text(info);
    $("#info_modal").modal("show");
}
/**
 * 切换页面
 * @param index
 */
function showPage(index) {
    // console.log(index);
    if (index == 1){
        $("#user_page").removeClass("hidden");
        $("#song_page").addClass("hidden");
        $("#genre_page").addClass("hidden");
    }else if (index == 2){
        $("#user_page").addClass("hidden");
        $("#song_page").removeClass("hidden");
        $("#genre_page").addClass("hidden");
    }else if (index == 3){
        $("#user_page").addClass("hidden");
        $("#song_page").addClass("hidden");
        $("#genre_page").removeClass("hidden");
    }
}

/**
 * 跳转到页面
 * @param url
 * @param data
 * @param index
 */
function to_page(url,data,index) {
    // console.log("加载页面:"+index+" url"+url);
    $.ajax({
        url: url,
        data: data,
        method: "GET",
        success: function (result) {
            // console.log(result);
            build_page(result,url,data,index);
        }
    });

}

/**
 * 构建页面
 * @param result
 * @param url
 * @param data
 * @param index
 */
function build_page(result,url,data,index) {
    // console.log("构建页面");
    // console.log(result);
    // console.log("url:"+url+" data:"+data+" index:"+index)

    if (index == 1){
        // 用户信息加载
        // 表格信息
        user_table(result);
        // 分页信息
        build_page_info(result,"#user_page_info_area");
        // 分页条
        build_page_nav(result,url,data,1,"#user_page_nav_area");

    }else if (index == 2){
        // 音乐信息加载
        // 表格信息
        song_table(result);
        // 分页信息
        build_page_info(result,"#song_page_info_area");
        // 分页条
        build_page_nav(result,url,data,2,"#song_page_nav_area");

    }else if (index == 3){
        // 分类信息加载
        // 表格信息
        genre_table(result);
        // 分页信息
        build_page_info(result,"#genre_page_info_area");
        // 分页条
        build_page_nav(result,url,data,3,"#genre_page_nav_area");

    }

}

/**
 * 构建用户表
 * @param result
 */
function user_table(result) {
    // console.log("构建用户数据");
    var list = result.extend.pageInfo.list;
    var userTable = $("#user_table");
    userTable.empty();
    // 表头
    var table_header = $("<tr><th>#<th>mail<th>password<th>nickname<th>avatar<th>locked<th>birthday<th>手机号<th>操作</th>").appendTo(userTable);
    // 数据
    $.each(list,function (index,item) {
        var userItem = $("<tr></tr>");
        $("<td></td>").text(item.id).appendTo(userItem);
        $("<td></td>").text(item.mail).appendTo(userItem);
        $("<td></td>").text(item.password).appendTo(userItem);
        $("<td></td>").text(item.nickname).appendTo(userItem);
        var avatar = $("<img/>",{
            src: item.avatar,
            height: "1.6em"
        });
        $("<td></td>").html(avatar).appendTo(userItem);
        $("<td></td>").text(item.locked).appendTo(userItem);
        if (item.locked == "Y"){
            userItem.addClass("deleted");
        }else {
            userItem.addClass("info");
        }
        $("<td></td>").text(timestampToDate(item.birth)).appendTo(userItem);
        $("<td></td>").text(item.phone).appendTo(userItem);
        var modifyBtn = $("<button></button>").text("修改").addClass("btn btn-success").addClass("modify");
        var deleteBtn = $("<button></button>").text("删除").addClass("btn btn-danger").addClass("delete");
        $("<td></td>").append(modifyBtn).append(deleteBtn).appendTo(userItem);
        userItem.appendTo(userTable);
    });

}

/**
 * 音乐表
 * @param result
 */
function song_table(result) {
    // console.log("构建song表格");
    var list = result.extend.pageInfo.list;
    var songTable = $("#song_table");
    songTable.empty();
    // 表头
    var table_header = $("<tr><th>#<th>title<th>author<th>language<th>genreId<th>source<th>poster<th>status<th>操作</th>").appendTo(songTable);
    // 数据
    $.each(list,function (index,item) {
        var songItem = $("<tr></tr>");
        $("<td></td>").text(item.id).appendTo(songItem);
        $("<td></td>").text(item.title).appendTo(songItem);
        $("<td></td>").text(item.author).appendTo(songItem);
        $("<td></td>").text(item.language).appendTo(songItem);
        // var genre = getGenreById(item.genreId);
        // console.log(genre);
        // if (genre != null){
        //     $("<td></td>").text(item.genreId).append($("<span></span>").text(genre.name)).appendTo(songItem);
        // }else {
        //     $("<td></td>").text(item.genreId).append($("<span></span>").text("未知")).appendTo(songItem);
        // }

        $("<td></td>").text(item.genreId).appendTo(songItem);


        var sourceName = item.source.substring(item.source.lastIndexOf('/')+1);
        var source = $("<a></a>").text(sourceName).attr("href",item.source);
        $("<td></td>").html(source).appendTo(songItem).addClass("long_text").width("5rem");
        var posterName = item.poster.substring(item.poster.lastIndexOf('/')+1);
        // var poster = $("<a></a>").text(posterName).attr("href",item.poster);
        var poster = $("<img/>").attr("src",item.poster).attr("title",posterName).height("1.6em");
        $("<td></td>").html(poster).appendTo(songItem).addClass("long_text").width("5px");
        $("<td></td>").text(item.status).appendTo(songItem);
        var modifyBtn = $("<button></button>").text("修改").addClass("btn btn-success").addClass("modify");
        var deleteBtn = $("<button></button>").text("删除").addClass("btn btn-danger").addClass("delete");
        $("<td></td>").append(modifyBtn).append(deleteBtn).appendTo(songItem);
        songItem.appendTo(songTable);
    });

}

/**
 * 分类表格
 * @param result
 */
function genre_table(result) {
    // console.log("构建分类表格");
    var list = result.extend.pageInfo.list;
    var genreTable = $("#genre_table");
    genreTable.empty();
    // 表头
    var table_header = $("<tr><th>#<th>name<th>description<th>操作</th>").appendTo(genreTable);
    // 数据
    $.each(list,function (index,item) {
        var genreItem = $("<tr></tr>");
        $("<td></td>").text(item.id).appendTo(genreItem);
        $("<td></td>").text(item.name).appendTo(genreItem);
        if (item.description == null){
            $("<td></td>").text("无").appendTo(genreItem);
        }else {
            $("<td></td>").text(item.description).appendTo(genreItem);
        }
        var modifyBtn = $("<button></button>").text("修改").addClass("btn btn-success").addClass("modify");
        var deleteBtn = $("<button></button>").text("删除").addClass("btn btn-danger").addClass("delete");
        $("<td></td>").append(modifyBtn).append(deleteBtn).appendTo(genreItem);
        genreItem.appendTo(genreTable);
    });

}

/**
 * 时间戳转日期
 * @param time
 * @returns {string}
 */
function timestampToDate(time) {
    const date = new Date(time).getTime()
    var d = new Date(date);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    String(month).length < 2 ? (month = '0' + month):month;
//	三目运算符
    var day = d.getDate();
    String(day).length < 2 ? (day = '0' + day):day;
//	var hour=now.getHours();
//	var minute=now.getMinutes();
//	var second=now.getSeconds();
    var datetime = year + "-" + month + "-" + day;
    return datetime;
}

/**
 * 分页信息
 * @param result
 */
function build_page_info(result,id) {
    $(id).empty();
    $(id).html("当前" + result.extend.pageInfo.pageNum + "页，总共" + result.extend.pageInfo.pages + "页，" + result.extend.pageInfo.total + "条记录");
}
/**
 * 解析并显示分页条
 * @param result
 */
function build_page_nav(result,url,data,index,id) {
    // console.log("构建分页条");
    // console.log(data);
    $(id).empty();// 清空

    // 首页与前一页
    var ul = $("<ul></ul>").addClass("pagination");
    var firstPageLi = $("<li></li>").append($("<a></a>").append("首页").attr("href", "javascript:;"));
    var prePageLi = $("<li></li>").append($("<a></a>").append("&laquo;"));
    if (result.extend.pageInfo.hasPreviousPage == false) {
        // 第一页
        firstPageLi.addClass("disabled");
        prePageLi.addClass("disabled");
    }
    // 添加点击事件
    firstPageLi.click(function () {
        var firstpageData = data;
        firstpageData.pn = 1;
        to_page(url,firstpageData,index);
    });
    prePageLi.click(function () {
        var prePageData = data;
        prePageData.pn = result.extend.pageInfo.pageNum - 1;
        to_page(url,prePageData,index);
    });

    // 下一页与尾页
    var nextPageLi = $("<li></li>").append($("<a></a>").append("&raquo;"));
    var lastPageLi = $("<li></li>").append($("<a></a>").append("末页").attr("href", "javascript:;"));
    if (result.extend.pageInfo.hasNextPage == false) {
        // 最后一页
        nextPageLi.addClass("disabled");
        lastPageLi.addClass("disabled");
    }
    // 添加点击事件
    nextPageLi.click(function () {
        var nextPageData = data;
        nextPageData.pn = result.extend.pageInfo.pageNum + 1;
        to_page(url,nextPageData,index);
    });
    lastPageLi.click(function () {
        var lastPageData = data;
        lastPageData.pn = result.extend.pageInfo.pages;
        to_page(url,lastPageData,index);
    });

    /**
     * 组合分页条
     */
    // 添加首页和前一页
    ul.append(firstPageLi).append(prePageLi);
    // 遍历添加页码提示
    $.each(result.extend.pageInfo.navigatepageNums, function (i, item) {
        var numPageLi = $("<li></li>").append($("<a></a>").append(item));
        // 选中页高亮
        if (result.extend.pageInfo.pageNum == item) {
            numPageLi.addClass("active");
        }
        numPageLi.click(function () {
            var numPageData = data;
            numPageData.pn = i+1;
            to_page(url,numPageData,index);
        });
        ul.append(numPageLi);
    });
    // 添加下一页与末页
    ul.append(nextPageLi).append(lastPageLi);
    // 把ul加入到nav元素
    var navEle = $("<nav></nav>").append(ul);
    $(id).append(navEle);
}

/**
 * 获取用户数据
 * @param element
 * @returns {{}}
 */
function getUserInfo(element) {
    var items = $(element).parent().parent().children();
    var id = items.eq(0).text();
    var mail = items.eq(1).text();
    var password = items.eq(2).text();
    var nickename = items.eq(3).text();
    var avatar = items.eq(4).children("img").attr("src");
    var locked = items.eq(5).text();
    var birth = items.eq(6).text();
    var phone = items.eq(7).text();

    var user = {};
    user.id = id;
    user.mail = mail;
    user.password = password;
    user.nickname = nickename;
    user.avatar = avatar;
    user.locked = locked;
    user.birth = birth;
    user.phone = phone;

    // console.log(user);
    return user;
}

function getSongInfo(element) {
    var items = $(element).parent().parent().children();
    var id = items.eq(0).text();
    var title = items.eq(1).text();
    var author = items.eq(2).text();
    var language = items.eq(3).text();
    var genreId = items.eq(4).text();
    var source = items.eq(5).children("a").attr("href");
    var poster = items.eq(6).children("img").attr("src");
    var status = items.eq(7).text();

    var song = {};
    song.id = id;
    song.title = title;
    song.author = author;
    song.language = language;
    song.genreId = genreId;
    song.source = source;
    song.poster = poster;
    song.status = status;
    // console.log(song);
    return song;
}

function getGenreInfo(element) {
    var items = $(element).parent().parent().children();
    var id = items.eq(0).text();
    var name = items.eq(1).text();
    var description = items.eq(2).text();

    var genre = {};
    genre.id = id;
    genre.name = name;
    genre.description = description;
    // console.log(genre);
    return genre;
}


/**
 * 将修改界面信息填入
 * @param user
 */
function init_userInfo_modal(user){
    // console.log(user);
    $("#modifyUserIdForm").val(user.id);
    $("#modifyMailForm").val(user.mail);
    $("#modifyNicknameForm").val(user.nickname);
    $("#modifyPasswordForm").val(user.password);
    if (user.locked == "Y"){
        $("#modifyLockedForm").prop("checked",true);
    }else if (user.locked == "N"){
        $("#modifyLockedForm").prop("checked",false);
    }
    $("#modifyBirthForm").val(user.birth);
    $("#modifyPhoneForm").val(user.phone);
}

function init_songInfo_modal(song) {
    $("#modifySongIdForm").val(song.id);
    $("#modifySongTitleForm").val(song.title);
    $("#modifySongAuthorForm").val(song.author);
    $("#modifySongLanguageForm").val(song.language);
    loadGenre("#modifySongGenreForm",song.genreId);
    // $("#modifySongStatus"+" option[value="+song.status+"]").attr("selected", true);
    $("#modifySongStatus option[value= "+song.status+"]").attr("selected", true);
}

function init_genreInfo_modal(genre) {
    $("#modifyGenreIdForm").val(genre.id);
    $("#modifyGenreNameForm").val(genre.name);
    $("#modifyDescriptionForm").val(genre.description);
}


/**
 * 删除用户
 * @param id
 */
function delete_user(id) {
    $.ajax({
        url: "/admin/deleteUser",
        method: "GET",
        data: {
            id: id
        },
        success: function (result) {
            if (result.code == 100){
                // console.log("删除成功");
                info_modal("删除成功");
                to_page("/user/page",{pn:1,size:8},1);
            }else {
                // console.log("删除失败");
                info_modal("删除失败");
            }
        },
        error: function () {
            // console.log("请求失败");
            info_modal("请求失败");
        }
    });
}

function delete_song(id) {
    if (id == null){
        console.info("无ID");
        return false;
    }
    $.ajax({
        url: "/song/deleteSong",
        method: "GET",
        data: {
            id: id
        },
        success: function (result) {
            if (result.code == 100){
                info_modal(result.msg);
                to_page("/song/page",{pn:1,size:8},2);
                return true;
            }else {
                info_modal(result.msg);
                return false;
            }
        },
        error: function () {
            info_modal("连接服务器失败!");
            return false;
        }
    });
}

function delete_genre(id) {
    if (id == null){
        return false;
    }
    $.ajax({
        url: "/genre/deleteGenre",
        method: "GET",
        data: {id: id},
        success: function (result) {
            if (result.code == 100){
                info_modal(result.msg);
                return true;
            }else {
                console.info(result.m);
                return false;
            }
        },
        error: function () {
                info_modal("连接服务器失败");
                return false;
        }
    });
}

// 获取修改信息

function get_modify_userInfo() {
    // var user = new FormData();
    var user = {};
    user.id = $("#modifyUserIdForm").val();
    var mail = $("#modifyMailForm").val();
    if(mail !== null && mail != ""){
        user.mail = mail;
    }
    var password = $("#modifyPasswordForm").val();
    if(password != null && password != ""){
        user.password = password;
    }
    var nickname = $("#modifyNicknameForm").val();
    if (nickname != null && nickname != ""){
        user.nickname = nickname;
    }
    var locked = $("#modifyLockedForm").prop("checked")?"Y":"N";
    if (locked != null && locked != ""){
        user.locked = locked;
    }
    var birth = $("#modifyBirthForm").val();
    if (birth != null && birth != ""){
        user.birth = birth;
    }
    var phone = $("#modifyPhoneForm").val();
    if (phone != null && phone != ""){
        user.phone = phone;
    }

    // 上传头像头像并获取链接
    var file = $("#modifycAvatarForm")[0].files[0];
    if (file != null){
        var avatarUrl = uploadFileAndGetUrl(file);
        user.avatar = avatarUrl;
    }

    console.log(user);
    return user;
}

function get_modify_songInfo() {
    var song = {};
    song.id = $("#modifySongIdForm").val();
    var title = $("#modifySongTitleForm").val();
    if (title != null && title != ""){
        song.title = title;
    }
    var author = $("#modifySongAuthorForm").val();
    if(author!=null && author!=""){
        song.author = author;
    }
    var language = $("#modifySongLanguageForm").val();
    if(language!=null && language!=""){
        song.language = language;
    }
    var genreId = $("#modifySongGenreForm").val();
    if(genreId!=null && genreId!=""){
        song.genreId = genreId;
    }
    var source = $("#modifySongSourceForm")[0].files[0];
    if(source!=null && source!=""){
        sourceUrl = uploadFileAndGetUrl(source);
        song.source = sourceUrl;
    }
    var poster = $("#modifySongPosterForm")[0].files[0];
    if(poster!=null && poster!=""){
        var posterUrl = uploadFileAndGetUrl(poster);
        song.poster = posterUrl;
    }
    var status = $("#modifySongStatus").val();
    song.status = status;
    console.log(song);
    return song;
}

function get_modify_genreInfo() {
    var id = $("#modifyGenreIdForm").val();
    var name = $("modifyGenreNameForm").val();
    var description = $("#modifyDescriptionForm").val();
    var genre = {};
    genre.id = id;
    genre.name = name;
    genre.description = description;
    return genre;
}

// 修改信息

function modify_user(user) {
    console.log("修改用户：");
    console.log(user);
    if (user.id == null || user.id == undefined){
        info_modal("ID出错");
        return;
    }
    $.ajax({
        url: "/admin/updateUser",
        method: "POST",
        dataType: "json",
        data: user,
        success: function (result) {
            if (result.code == 100){
                info_modal(result.msg);
                to_page("/user/page",{pn:1,size:8},1);
                return true;
            }else {
                info_modal(result.msg);
                return false;
            }
        },
        error: function (result) {
            console.log(result);
            info_modal("连接服务器失败");
        }
    });
}

function modify_song(song) {
    console.log("修改音乐：");
    console.log(song);

    if (song.id == null || song.id == undefined){
        info_modal("ID出错");
        return;
    }
    $.ajax({
        url: "/song/updateSong",
        method: "POST",
        data: song,
        success: function (result) {
            if (result.code == 100){
                info_modal(result.msg);
                to_page("/song/allPage",{pn:1,size:8},2)
                return true;
            }else {
                info_modal(result.msg);
                return false;
            }
        },
        error: function () {
            info_modal("连接服务器失败");
        }
    });

}

function modify_genre(genre) {
    if (genre.id == null || genre.id == "" || genre.id == undefined){
        info_modal("无分类id");
        return false;
    }
    $.ajax({
        url: "/genre/updateGenre",
        method: "GET",
        data: genre,
        success: function (result) {
            if (result.code == 100){
                info_modal(result.msg);
                return true;
            }else {
                info_modal(result.msg);
                return false;
            }
        },
        error: function () {
            info_modal("连接服务器失败");
            return false;
        }
    });
}

// === 检查添加数据 ===
function checkAddUser(){
    // 检查用户名
    var mail = $("#registerMailForm").val();
    if (mail == null || mail == ""){
        alertInfo("请输入邮箱");
        return false;
    }
    if(!checkMail(mail)){
        alertInfo("邮箱格式有错误");
        return false;
    }

    if(!checkUserMailRepeat(mail,alertInfo)){
        return false;
    }

    // 检查密码
    var password = $("#registerPasswordForm").val();
    if (password == null || password == ""){
        alertInfo("请填写密码");
        return false;
    }
}

function checkAddSong() {
    // 检查歌名
    var title = $("#inputSongName").val();
    if (title == null || title == ""){
        alertInfo("请填写歌曲名称");
        return false;
    }

    // 检查歌曲来源
    var source = $("#inputSongFile")[0].files[0];
    if (source == null){
        alertInfo("请选择并上传歌曲")
        return false;
    }
}

function checkAddGenre() {
    // 检查分类名
    var name = $("#genreNameForm").val();
    if(name == null || name == ""){
        alertInfo("请填写分类名");
        return false;
    }
}

// === 获取添加数据 ===

function getAddUserInfo() {
    var user = {};
    var avatarFile = $("#registercAvatarForm")[0].files[0];
    if (avatarFile != null){
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

function getAddSongInfo() {
    var inputSongName = $("#inputSongName").val();
    var inputArtist = $("#inputArtist").val();
    var inputSongLanguage = $("#inputSongLanguage").val();
    var inputSongGenre = $("#inputSongGenre").val();
    var inputSoure = $("#inputSongFile")[0].files[0];
    var inputPoster = $("#inputPoster")[0].files[0];
    var source = uploadFileAndGetUrl(inputSoure);
    var poster = uploadFileAndGetUrl(inputPoster);
    // 封装数据
    var song = {
        title: inputSongName,
        author: inputArtist,
        language: inputSongLanguage,
        genre_id: inputSongGenre,
        source: source,
        poster: poster
    };
    console.log(song);
    return song;
}

function getAddGenreInfo() {
    var genre = {};
    genre.name = $("#genreNameForm").val();
    genre.description = $("#genreDescForm").val();
    console.log(genre);
    return genre;
}