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
        $("<td></td>").text(item.genreId).appendTo(songItem);
        var source = item.source.substring(item.source.lastIndexOf('/')+1);
        $("<td></td>").html(source).appendTo(songItem).addClass("long_text").width("5rem");
        var poster = item.poster.substring(item.poster.lastIndexOf('/')+1);
        $("<td></td>").text(poster).appendTo(songItem).addClass("long_text").width("5px");
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

    console.log(user);
    return user;
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

function modify_user() {

}

/**
 * 将修改界面信息填入
 * @param user
 */
function init_userInfo_modal(user){
    $("#modifyMailForm").val(user.mail);
    $("#modifyNicknameForm").val(user.nickname);
    $("#modifyPasswordForm").val(user.password);
    $("#modifyPhoneForm").val(user.phone);
}

/**
 * 展示提示信息
 * @param info
 */
function info_modal(info) {
    $("#info_modal .modal-body p").text(info);
    $("#info_modal").modal("show");
}