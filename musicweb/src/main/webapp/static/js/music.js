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
                                            <div class="poster">\
                                                <img src="'+song.poster+'" alt="'+song.title+'">\
                                            </div>\
                                            <div class="song_info">\
                                                <span>' + index + '</span>\
                                                <p class="lead song_title">' + song.title + '</p>\
                                                <small>' + song.author + '</small> - <small>' + song.language + '</small>\
                                                <a href="' + song.source + '"  hidden>' + song.id + '</a>\
                                            </div>\
                                            <div>\
                                                <button class="btn btn-success play">播放</button>\
                                                <button class="btn btn-default collect"><svg t="1630410795907" class="icon" viewBox="0 0 1065 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2513" width="20" height="20"><path d="M1057.57377 394.491803c-8.393443-41.967213-41.967213-67.147541-83.934426-75.540983l-235.016393-41.967213L629.508197 58.754098C612.721311 25.180328 570.754098 0 528.786885 0s-75.540984 25.180328-92.327869 58.754098L327.344262 276.983607l-235.016393 41.967213c-41.967213 8.393443-75.540984 33.57377-83.934426 75.540983-8.393443 41.967213 0 83.934426 33.57377 109.114754l167.868853 159.47541-41.967214 226.622951c-8.393443 41.967213 8.393443 83.934426 41.967214 109.114754 33.57377 25.180328 75.540984 25.180328 117.508196 8.393443l218.229508-109.114754L747.016393 1007.213115c16.786885 8.393443 33.57377 8.393443 50.360656 16.786885 25.180328 0 41.967213-8.393443 67.147541-25.180328 33.57377-25.180328 50.360656-67.147541 41.967213-109.114754l-41.967213-226.622951 167.868853-159.47541c25.180328-25.180328 41.967213-67.147541 25.180327-109.114754zM293.770492 923.278689h-16.786885c-8.393443 0-16.786885 0-16.786886-8.393443-8.393443-8.393443-16.786885-16.786885-16.786885-33.573771l50.360656-251.803278v-8.393443l-184.655738-167.868852c-8.393443-8.393443-16.786885-16.786885-8.393443-33.573771 0-8.393443 16.786885-16.786885 25.180328-25.180328l260.196722-50.360655L503.606557 117.508197c8.393443-8.393443 16.786885-16.786885 25.180328-16.786886 8.393443 0 25.180328 8.393443 25.180328 16.786886L671.47541 352.52459l260.196721 41.967213c8.393443 0 25.180328 8.393443 25.180328 25.180328 0 8.393443 0 25.180328-8.393443 33.573771L772.196721 629.508197l50.360656 260.196721c0 8.393443 0 25.180328-16.786885 33.573771-8.393443 0-8.393443 8.393443-16.786885 8.393442s-8.393443 0-16.786886-8.393442L537.180328 814.163934v-16.786885L293.770492 923.278689z" p-id="2514"></path></svg></button>\
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

function thumbnailResize() {
    console.log("thumbnailResize");
    var width = $(".thumbnail img").width();
    console.log("img width:"+width);
    $(".thumbnail img").size(width,width);
}