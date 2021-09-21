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
    <script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"
            integrity="sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ"
            crossorigin="anonymous"></script>
    <script src="/static/js/utils.js"></script>
</head>
<body>
<script>
    $(function () {
        console.log("hello");
        // user = {
        //     mail: "123@qq.com",
        //     password: "123"
        // }
        // uploadUser(user,alertInfo);

        var song = {
            title: "testsong",
            author: "未知",
            poster: "www.baidu.com",
            source: "www.baidu.com"
        }
        uploadSong(song,alertInfo);
    });
</script>
</body>
</html>
