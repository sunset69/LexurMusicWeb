// ==================================方法==================================
/**
 * 跳转页面
 * @param pn
 * @param size
 */
function to_page(pn, size = 8) {
    $.ajax({
        url: "/song/page",
        data: {pn: pn, size: size},
        method: "GET",
        success: function (result) {
            // console.log(result);
            build_page(result);
        }
    });
}

/**
 * 歌曲分页信息构建页面
 * @param result
 */
function build_page(result) {
    // 1. 解析并显示音乐
    build_song_list(result);
    // 2. 解析并显示分页信息
    build_page_info(result);
    // 3. 解析并显示分页条
    build_page_nav(result);
    // 滑动到顶部
    $(Document).scrollTop($(0));
}

/**
 * 构建音乐单元
 * @param song
 * @param index
 * @returns {string}
 */
function build_album(song, index) {
    // console.log(song);
    var albumEle = $("<div></div>").addClass("col-xs-6 col-md-3");
    var thumbnailEle = $("<div></div>").addClass("thumbnail text-center");

    var posterEle = $("<div></div>").addClass("poster text-center");
    var imgEle = $("<img>", {
        src: song.poster,
        alt: song.title,
        title: song.title
    }).appendTo(posterEle);

    var songInfoEle = $("<div></div>").addClass("song_info");
    var indexEle = $("<span></span>").text(index).appendTo(songInfoEle);
    var titleEle = $("<p></p>").text(song.title).addClass("lead song_title").appendTo(songInfoEle);
    var authorEle = $("<small></small>").text(song.author).appendTo(songInfoEle);
    var spanEle = $("<small>-</small>").appendTo(songInfoEle);
    var languageEle = $("<small></small>").text(song.language).appendTo(songInfoEle);
    var sourceEle = $("<a></a>", {
        href: song.source,
        hidden: true,
    }).text(song.id).appendTo(songInfoEle);

    // 按钮
    var btns = $("<div></div>");
    var playBtn = $("<button></button>").addClass("btn btn-success btn-sm play");
    var playSpan = $("<span></span>").addClass("glyphicon glyphicon-play");
    playBtn.append(playSpan);
    var collectBtn = $("<button></button>").addClass("btn btn-default btn-sm collect").attr("onclick", "toggleCollect(this,userInfo.id);");
    // TODO 判断是否收藏
    var collectSpan = $("<span></span>").addClass("glyphicon glyphicon-star").appendTo(collectBtn);
    // if (checkCollection(getUserInfo().id,song.id)){
    //     var collectSpan = $("<span></span>").addClass("glyphicon glyphicon-star").appendTo(collectBtn);
    // }else {
    //     var collectSpan = $("<span></span>").addClass("glyphicon glyphicon-star-empty").appendTo(collectBtn);
    // }
    btns.append(playBtn).append(collectBtn);

    thumbnailEle.append(posterEle).append(songInfoEle).append(btns);
    albumEle.append(thumbnailEle);

    return albumEle;
}

/**
 * 解析并显示音乐
 * @param result
 */
function build_song_list(result) {
    let pageInfo = result.extend.pageInfo;
    let list = pageInfo.list;
    $("#song-display").empty();
    $.each(result.extend.pageInfo.list, function (index, item) {
        var nu = (result.extend.pageInfo.pageNum - 1) * result.extend.pageInfo.pageSize + index + 1;
        let album = build_album(item, nu);
        $("#song-display").append(album);
    });
}

/**
 * 解析并显示分页信息
 * @param result
 */
function build_page_info(result) {
    $("#page_info_area").empty();
    $("#page_info_area").html("当前" + result.extend.pageInfo.pageNum + "页，总共" + result.extend.pageInfo.pages + "页，" + result.extend.pageInfo.total + "条记录");
}

/**
 * 解析并显示分页条
 * @param result
 */
function build_page_nav(result) {
    $("#page_nav_area").empty();
    var ul = $("<ul></ul>").addClass("pagination");
    var firstPageLi = $("<li></li>").append($("<a></a>").append("首页").attr("href", "#"));
    var prePageLi = $("<li></li>").append($("<a></a>").append("&laquo;"));
    if (result.extend.pageInfo.hasPreviousPage == false) {
        firstPageLi.addClass("disabled");
        prePageLi.addClass("disabled");
    }
    // 添加点击事件
    firstPageLi.click(function () {
        to_page(1);
    });
    prePageLi.click(function () {
        to_page(result.extend.pageInfo.pageNum - 1);
    });

    var nextPageLi = $("<li></li>").append($("<a></a>").append("&raquo;"));
    var lastPageLi = $("<li></li>").append($("<a></a>").append("末页").attr("href", "#"));
    if (result.extend.pageInfo.hasNextPage == false) {
        nextPageLi.addClass("disabled");
        lastPageLi.addClass("disabled");
    }
    // 添加点击事件
    nextPageLi.click(function () {
        to_page(result.extend.pageInfo.pageNum + 1);
    });
    lastPageLi.click(function () {
        to_page(result.extend.pageInfo.pages);

    });

    // 添加首页和前一页
    ul.append(firstPageLi).append(prePageLi);

    // 遍历添加页码提示
    $.each(result.extend.pageInfo.navigatepageNums, function (index, item) {

        var numPageLi = $("<li></li>").append($("<a></a>").append(item));
        // 选中页高亮
        if (result.extend.pageInfo.pageNum == item) {
            numPageLi.addClass("active");
        }
        numPageLi.click(function () {
            to_page(index + 1);
        });
        ul.append(numPageLi);
    });

    // 添加下一页与末页
    ul.append(nextPageLi).append(lastPageLi);

    // 把ul加入到nav元素
    var navEle = $("<nav></nav>").append(ul);
    $("#page_nav_area").append(navEle);
}

/**
 * 初始化音乐播放器
 */
function initPlayer() {
    var player = new cplayer({
        element: document.getElementById('app'),
        playlist: [],
        big: true,
        width: "100%"
    });
    return player;
}

/**
 * 将音乐添加至播放列表
 * @param song
 */
function add_to_playlist(song, player) {
    item = {
        src: song.source,
        poster: song.poster,
        name: song.index + song.title,
        artist: song.author
    }
    // console.log(item);
    // player.add(item);
    player.pause();
    var result = player.add(item);
    // console.log("add return:"+result);
    // player.playlist.splice(player.nowplaypoint,0,item);
    console.log(player.playlist);
    player.to(player.playlist.length);
    // player.play();

    player.play();
}

/**
 * 获取音乐分类
 */
function getSongGenre(id) {
    $.ajax({
        url: "/genre/page",
        method: "GET",
        success: function (result) {
            console.log(result);
            // 获取分类信息
            // result.extend.genre
            // 显示下拉列表
            // $("#inputSongGenre").
            $(id).empty();
            $.each(result.extend.genreList, function () {
                var optionEle = $("<option></option>").append(this.name).attr("value", this.id);
                optionEle.appendTo(id);
                // optionEle.appendTo("#inputSongGenre");
                // optionEle.appendTo("#SongGenre");
            });
        }
    });
}

/**
 * 获取音乐信息
 * @param element
 * @returns {{author, index: jQuery, language, id: jQuery, source: jQuery, title: jQuery, poster: jQuery}}
 */
function getSongInfo(element) {
    var song = {};
    var poster = $(element).parent().siblings(".poster").children("img").prop("src");
    var index = $(element).parent().siblings(".song_info").children("span").text();
    var songName = $(element).parent().siblings(".song_info").children("p").text();
    var singer = $(element).parent().siblings(".song_info").children("small:first").text();
    var songLanguage = $(element).parent().siblings(".song_info").children("small:last").text();
    var url = $(element).parent().siblings(".song_info").children("a").prop("href");
    var songId = $(element).parent().siblings(".song_info").children("a").text();
    song = {
        index: index,
        id: songId,
        poster: poster,
        title: songName,
        source: url,
        author: singer,
        language: songLanguage
    }
    return song;
}

/**
 * 获取歌曲id
 * @param id
 */
function get_form_data(id) {
    let data = $("#" + id).val();
    if (data == null) {
        console.log()
    }
}

/**
 * 检查上传文件类型
 * @param element
 * @param typeArr
 */
function checkFileType(element, typeArr) {
    var filePath = $("#" + element).val();
    // console.log(filePath);
    var realType = filePath.substr(filePath.lastIndexOf(".") + 1);
    // console.log("文件类型:"+realType);
    var isType = false;
    $.each(typeArr, function (index, item) {
        if (realType == item) {
            isType = true;
        }
    });
    if (isType) {
        showInfo(element + "_info", "文件类型支持");
        return true;
    } else {
        showInfo(element + "_info", "不支持");
        return false;
    }
}

/**
 * 检测是否收藏
 * @param userId
 * @param songId
 */
function checkCollection(userId,songId) {
    var settings = {
        "url": "/collect/check",
        data:{
            userId: userId,
            songId: songId
        },
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        // console.log(response);
        if (response.code == 100){
            console.log(response.code);
            return true;
        }else {
            console.log(response.code);
            return false;
        }
    });
}

/**
 * 展示错误信息
 * @param element
 * @param info
 */
function showInfo(element, info) {
    $("#" + element).text(info);
}

/**
 * 将文件上传至文件服务器并获取链接
 * @param file
 * @returns {*} 返回链接
 */
function uploadFile(element) {
    var link;

    var file = $(element)[0].files[0];
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
                console.log("url:" + link);
            } else {
                console.log("上传失败！");
            }
        },
        error: function (result) {
            console.log("upload fail");
        }
    });
    console.log("返回链接：" + link);
    return link;
}

/**
 * 弹出提示模态框
 * @param info
 */
function infoModal(info) {
    // $("#alertModal p").empty();
    $("#alertModal p").text(info);
    $("#alertModal").modal({
        backdrop: true
    });
}

function thumbnailResize() {
    console.log("thumbnailResize");
    var width = $(".thumbnail img").width();
    console.log("img width:" + width);
    $(".thumbnail img").size(width, width);
}

/**
 * 收藏/取消收藏
 * @param element
 */
function toggleCollect(element, userInfo) {
    $(element).children("span").toggleClass("glyphicon-star").toggleClass("glyphicon-star-empty");
    var className = $(element).children("span").attr("class");
    var songId = $(element).parent("div").siblings(".song_info").children("a").text();
    var userId = getUserInfo().id;
    if (className == "glyphicon glyphicon-star") {
        console.log(songId + "收藏 " + className);
        // 放松收藏请求
        $.ajax({
            url: "/collect/add",
            method: "GET",
            data: {
                userId: userId,
                songId: songId
            },
            success: function (result) {
                if (result.code == 100) {
                    infoModal("添加成功！\n" + result.msg);
                } else {
                    infoModal("失败！\n" + result.msg);
                }
            }
        });
    } else {
        console.log("取消收藏 " + className);
        // 发送取消收藏请求
        $.ajax({
            url: "/collect/delete",
            method: "GET",
            data: {
                userId: userId,
                songId: songId
            },
            success: function (result) {
                if (result.code == 100) {
                    infoModal("添加成功！\n" + result.msg);
                } else {
                    infoModal("失败！\n" + result.msg);
                }
            }
        });
    }
}

function togglePlay(element) {
    $(this).children("span").toggleClass("glyphicon-play").toggleClass("glyphicon-pause");
    var className = $(element).children("span").attr("class");
    console.log(className);
}

/**
 * 获取用户信息
 * @returns {{mail, phone, nickname, id: *}}
 */
function getUserInfo() {
    var userInfo;
    var ele = $("#userInfo > div > div > div.modal-body > strong");
    var userId = ele.eq(0).text();
    var nickname = ele.eq(1).text();
    var mail = ele.eq(2).text();
    var phone = ele.eq(3).text();
    userInfo = {
        id: userId,
        mail: mail,
        nickname: nickname,
        phone: phone
    }
    // console.log(userInfo);
    return userInfo;
}

function search(title,genre) {

}