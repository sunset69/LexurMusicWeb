<%-- Created by IntelliJ IDEA. User: john Date: 2021/8/23 Time: 22:40 To change this template use File | Settings | File
    Templates. --%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<% pageContext.setAttribute("APP_PATH", request.getContextPath()); %>
<%--        <% pageContext.setAttribute("MY_TEST", ); %>--%>
<html>

<head>
    <title>Lexur-music</title>
    <link rel="stylesheet" href="${APP_PATH}/static/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="${APP_PATH}/static/css/music.css">
    <link href="http://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

    <%--                <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js"></script>--%>
    <%--                <script src="${APP_PATH}/static/js/jquery-3.6.0.min.js"></script>--%>
    <script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"
            integrity="sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ"
            crossorigin="anonymous"></script>
    <script src="${APP_PATH}/static/bootstrap/js/bootstrap.min.js"></script>
    <%--                <script src="${APP_PATH}/static/cplayer/cplayer.js"></script>--%>
    <script src="https://cdn.jsdelivr.net/npm/cplayer/dist/cplayer.min.js"></script>
    <script src="${APP_PATH}/static/js/music.js"></script>

</head>

<body>
<div class="container">

    <div class="row">
        <!-- 标题 -->
        <div class="jumbotron">
            <a href="#" id="title">
                <h1>音乐分享${userInfo.mail}</h1>
            </a>
        </div>
    </div>

    <div class="row">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <!-- 回归主页 -->
                <div class="navbar-header">
                    <a class="navbar-brand" href="javascript:;" onclick="to_page();">Lexur-music</a>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <!-- 导航条左侧 -->
                    <ul class="nav navbar-nav">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                               aria-haspopup="true" aria-expanded="false">分类 <span
                                    class="caret"></span></a>
                            <ul class="dropdown-menu" id="SongGenre">
                                <!-- 分类内容 -->
                            </ul>
                        </li>
                    </ul>

                    <!-- 搜索框 -->
                    <form action="javascript:;" class="navbar-form navbar-left search-bar">
                        <input type="text" placeholder="请输入歌名" id="search_title" class="form-control">
                        <input type="text" placeholder="请输入歌手" id="search_author" class="form-control">
                        <select id="search_genre" class="form-control">
                            <option value="-1" selected>分类选择</option>
                        </select>
                        <button onclick="javascript:;" id="search_btn">
                            <span class="glyphicon glyphicon glyphicon-search" aria-hidden="true"></span>
                        </button>
                    </form>

                    <!-- 导航条右侧 -->
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="javascript:;" id="song_add_modal_btn">上传音乐</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                               aria-haspopup="true" aria-expanded="false">用户 <span
                                    class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">我的收藏</a></li>
                                <li><a href="http://localhost:2001/">退出</a></li>
                                <li><a href="#" data-toggle="modal" data-target="#userInfo">用户资料</a></li>
                            </ul>
                        </li>
                    </ul>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
        </nav>
    </div>

    <div class="row">
        <!-- 音乐展示 -->
        <div class="col-md-12 song-display text-center" id="song-display"></div>
    </div>

    <div class="row">
        <!-- 分页文字信息 -->
        <div class="col-md-6" id="page_info_area"></div>
        <!-- 分页条信息 -->
        <div class="col-md-9" id="page_nav_area"></div>
    </div>

    <div class="row">
        <!-- 显示音乐播放器按钮 -->
        <button type="button" data-toggle="modal" data-target="#playerModel" id="show_player">
            <svg t="1628118182057" class="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="3780" width="50" height="50">
                <path
                        d="M859.802 224.951v75.78h-695.228v-75.78zM859.615 440.288v75.78h-695.228v-75.78zM657.38 655.711v75.78h-492.917v-75.78zM706.421 799.131l153.298-125.14-153.298-125.14z"
                        fill="#39434E" p-id="3781"></path>
            </svg>
        </button>
    </div>

    <!-- ==================================模态框================================================= -->
    <div class="all-modal">
        <!-- 1. 播放器 -->
        <div class="modal fade" tabindex="-1" role="dialog" id="playerModel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"
                                aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">音乐播放器</h4>
                    </div>
                    <div class="modal-body">
                        <div id="app"></div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <!-- 2. 上传歌曲模态框 -->
        <div class="modal fade" tabindex="-1" role="dialog" id="song_add_modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"
                                aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">上传音乐</h4>
                    </div>
                    <div class="modal-body">
                        <!-- 上传音乐表单-->
                        <form class="form-horizontal" id="upload" action="javascript:;" method="post"
                              enctype="multipart/form-data">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">歌名</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputSongName"
                                           placeholder="歌名" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">歌手</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputArtist"
                                           placeholder="歌手" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">语言</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputSongLanguage"
                                           placeholder="语言" value="未知">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">分类</label>
                                <div class="col-sm-10">
                                    <!--打开模态框，加载分类，选择分类-->
                                    <select class="form-control" name="genre" id="inputSongGenre"></select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">上传歌曲</label>
                                <div class="col-sm-10">
                                    <input type="file" id="inputSongFile" required>
                                    <small id="inputSongFile_info"></small>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">上传封面</label>
                                <div class="col-sm-10">
                                    <input type="file" id="inputPoster">
                                    <small id="inputPoster_info"></small>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-offset-2 col-sm-10">
                                    <button class="btn btn-success" id="upload_song_btn">上传</button>
                                    <!-- <button class="btn btn-warning"
                                        onclick="$('#uploadModel').modal('hide')">取消</button> -->
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>

    <!-- 弹出警告 -->
    <div class="modal fade" tabindex="-1" role="dialog" id="alertModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">警告</h4>
                </div>
                <div class="modal-body">
                    <p>info</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btn-lg" data-dismiss="modal">Close</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</div>

<!-- 用户信息 -->
<div class="modal fade" tabindex="-1" role="dialog" id="userInfo">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">用户信息</h4>
            </div>
            <div class="modal-body">
                <div class="avatar">
                    <img src="${userInfo.avatar}">
                </div>
                <hr/>
                ID：<strong>${userInfo.id}</strong><br/>
                昵称：<strong>${userInfo.nickname}</strong><br/>
                邮箱：<strong>${userInfo.mail}</strong><br/>
                电话：<strong>${userInfo.phone}</strong><br/>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-lg" data-dismiss="modal">Close</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</div>

<!-- ==================================模态框================================================= -->

<div>
    <script>
        // 页面加载完成执行任务
        $(function () {

            console.log("欢迎进入lexur-music");
            var userInfo = getUserInfo();

            // 初始化播放器
            var player = initPlayer();

            // 跳转至首页
            to_page();
            getSongGenre("#SongGenre");
            getSongGenre("#search_genre");

            // 绑定事件，点击播放获取音乐信息
            $(".song-display").on("click", ".play", function () {
                var song = getSongInfo(this);
                add_to_playlist(song, player);
            });

            // 绑定事件，点击添加按钮弹出模态框
            $("#song_add_modal_btn").click(function () {
                // 发送ajax请求获取音乐分类
                getSongGenre("#inputSongGenre");
                // 弹出模态框
                $("#song_add_modal").modal({
                    backdrop: 'static',
                    show: true
                });
            });

            // 绑定事件，点击上传音乐，获取并检查数据后上传
            $("#upload_song_btn").click(function () {

                var source;
                var poster;

                if (checkFileType("inputSongFile", ["mp3", "wav"])) {
                    // 上床文件，获取链接
                    // source = uploadFile("#inputSongFile");
                } else {
                    // 弹出警告
                    infoModal("歌曲文件未选中或格式有问题!");
                    return;
                }
                if (checkFileType("inputPoster", ["jpg", "png", "jpeg"])) {
                    // poster = uploadFile("#inputPoster");
                } else {
                    // 弹出警告
                    infoModal("封面文件未选中或格式有问题!");
                    return;
                }
                // 获取数据
                var inputSongName = $("#inputSongName").val();
                var inputArtist = $("#inputArtist").val();
                var inputSongLanguage = $("#inputSongLanguage").val();
                var inputSongGenre = $("#inputSongGenre").val();

                // setTimeout('', 5000);
                // 封装数据
                var data = {
                    title: inputSongName,
                    author: inputArtist,
                    language: inputSongLanguage,
                    // admin_id: ,
                    genre_id: inputSongGenre,
                    source: uploadFile("#inputSongFile"),
                    poster: uploadFile("#inputPoster")
                };
                console.log(data);

                // 提交
                $.ajax({
                    url: "/song/addSong",
                    method: "POST",
                    data: data,
                    success: function (result) {
                        console.log(result);
                        if (result.code == 100) {
                            infoModal("上传成功");
                        } else {
                            infoModal("上传失败！\n" + result.msg);
                        }

                    },
                    error: function () {
                        infoModal("上传失败！");
                    }
                });

            });

            // 绑定事件，选择文件事件
            $("#inputSongFile").change(function () {
                checkFileType("inputSongFile", ["mp3", "wav"]);
            });
            $("#inputPoster").change(function () {
                checkFileType("inputPoster", ["jpg", "png", "jpeg"]);
            });

            // 收藏
            // $("button.collect").click(function () {
            //     console.log("hello");
            //     $(this).children("span").toggleClass("glyphicon-star").toggleClass("glyphicon-star-empty");
            //     console.log($(this).children());
            // });

            $("#search_btn").click(function () {
                console.log("搜索");
                search();
            });

        });/*结束*/
    </script>
</div>
</body>

</html>