<%--
  Created by IntelliJ IDEA.
  User: john
  Date: 2021/9/21
  Time: 16:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="/static/bootstrap/css/bootstrap.css">
    <link href="http://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"
            integrity="sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ"
            crossorigin="anonymous"></script>
    <script src="/static/bootstrap/js/bootstrap.min.js"></script>

    <script src="/static/js/utils.js"></script>
</head>
<body>
<div class="allmodal">
    <div class="modal fade" tabindex="-1" role="dialog" id="alert_modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">提示信息</h4>
                </div>
                <div class="modal-body">
                    <p>信息</p>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    $(function () {
        console.log("hello");
        // user = {
        //     mail: "123@qq.com",
        //     password: "123"
        // }
        // uploadUser(user,alertInfo);

        // var song = {
        //     title: "testsong",
        //     author: "未知",
        //     poster: "www.baidu.com",
        //     source: "www.baidu.com"
        // }
        // uploadSong(song,alertInfo);

        // var genre = {
        //     name: "test",
        //     description: "test"
        // }
        // uploadGenre(genre,alertInfo);
        alertInfo("test");
    });
</script>
</body>
</html>
