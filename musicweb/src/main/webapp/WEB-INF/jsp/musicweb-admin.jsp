<%--
  Created by IntelliJ IDEA.
  User: john
  Date: 2021/8/23
  Time: 20:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>控制台</title>
    <link rel="stylesheet" href="${APP_PATH}/static/bootstrap/css/bootstrap.css">
    <link href="http://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

    <script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"
            integrity="sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ"
            crossorigin="anonymous"></script>
    <script src="${APP_PATH}/static/bootstrap/js/bootstrap.min.js"></script>
    <script src="${APP_PATH}/static/js/musicweb-admin.js"></script>
</head>
<body>
<div class="container">
    <!-- 标题 -->
    <div class="row">
        <div class="jumbotron">
            <a href="#" id="title">
                <h1>音乐分享-控制台</h1>
            </a>
        </div>
    </div>

    <!-- 导航栏 -->
    <div class="row">
        <ul class="nav nav-tabs">
            <li role="presentation" class="active" index="1"><a href="#">用户管理</a></li>
            <li role="presentation" index="2"><a href="#">音乐管理</a></li>
            <li role="presentation" index="3"><a href="#">分类管理</a></li>
        </ul>
    </div>

    <!-- 用户管理 -->
    <div class="row" id="user_page">
        <p>user</p>
    </div>
    <!-- 音乐管理 -->
    <div class="row hidden" id="song_page">
        <p>song</p>
    </div>
    <!-- 分类管理 -->
    <div class="row hidden" id="genre_page">
        <p>genre</p>
    </div>

    <script>
        $(function () {
            console.log("欢迎进入控制台！");

            // 切换导航栏
            $(".nav-tabs li").click(function () {
                console.log($(this).children("a").text());
                var index = $(this).attr("index");
                showPage(index);
                $(this).addClass("active").siblings("li").removeClass("active");
            });


        });
    </script>
</div>
</body>
</html>
