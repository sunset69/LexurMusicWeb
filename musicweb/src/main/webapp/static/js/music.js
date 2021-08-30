// 定义全局变量



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
            console.log(result);
            // 1. 解析并显示音乐
            build_song_list(result);
            // 2. 解析并显示分页信息
            build_page_info(result);
            // 3. 解析并显示分页条
            build_page_nav(result);
            // 滑动到顶部
            $(Document).scrollTop($(0));
        }
    });
}

/**
 * 构建音乐单元
 * @param song
 * @param index
 * @returns {string}
 */
function build_album(song, index) {
    // console.log(song);
    var album = '<div class="col-xs-6 col-md-3">\
                                        <div class="thumbnail">\
                                            <img\
                                                src="' + song.poster + '">\
                                            <div class="song_info">\
                                                <span>' + index + '</span>\
                                                <p class="lead song_title">' + song.title + '</p>\
                                                <small>' + song.author + '</small> - <small>' + song.language + '</small>\
                                                <a href="' + song.source + '"  hidden>' + song.id + '</a>\
                                            </div>\
                                            <div>\
                                                <button class="btn btn-success play">播放</button>\
                                                <button class="btn btn-default collect">收藏</button>\
                                            </div>\
                                        </div>\
                                    </div>';
    return album;
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
 * 将音乐添加至播放列表
 * @param song
 */
function add_to_playlist(song,player) {
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
    if (file == null){
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
            if (result.code == 100){
                link = result.extend.url;
                console.log("url:"+link);
            }else {
                console.log("上传失败！");
            }
        },
        error: function (result) {
            console.log("upload fail");
        }
    });
    console.log("返回链接："+link);
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