<%--
  Created by IntelliJ IDEA.
  User: john
  Date: 2021/8/23
  Time: 20:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<% pageContext.setAttribute("APP_PATH", request.getContextPath()); %>
<html>
<%--实现自动跳转至登录页面--%>
<meta http-equiv="Refresh" content="5;url=${APP_PATH}/index.html ">
<head>
    <title>Title</title>
</head>
<body>
<h1>error</h1>
<p>正在返回登录页面。。。</p>
</body>
</html>
