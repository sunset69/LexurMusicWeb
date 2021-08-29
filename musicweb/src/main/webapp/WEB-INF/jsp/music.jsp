<%-- Created by IntelliJ IDEA. User: john Date: 2021/8/23 Time: 22:40 To change this template use File | Settings | File
    Templates. --%>
    <%@ page contentType="text/html;charset=UTF-8" language="java" %>

        <% pageContext.setAttribute("APP_PATH", request.getContextPath()); %>
            <html>

            <head>
                <title>Lexur-music</title>
                <link rel="stylesheet" href="${APP_PATH}/static/bootstrap/css/bootstrap.css">
                <link rel="stylesheet" href="${APP_PATH}/static/css/music.css">
                <link href="http://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

                <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js"></script>
                <script src="${APP_PATH}/static/bootstrap/js/bootstrap.min.js"></script>
                <script src="${APP_PATH}/static/cplayer/cplayer.js"></script>

            </head>

            <body>
                <div class="container">

                    <div class="row">
                        <!-- 标题 -->
                        <div class="jumbotron">
                            <a href="#" id="title">
                                <h1>音乐分享</h1>
                            </a>
                        </div>
                    </div>

                    <div class="row">
                        <nav class="navbar navbar-default">
                            <div class="container-fluid">
                                <!-- 回归主页 -->
                                <div class="navbar-header">
                                    <a class="navbar-brand" href="#">Lexur-music</a>
                                </div>

                                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                    <!-- 导航条左侧 -->
                                    <ul class="nav navbar-nav">
                                        <li class="dropdown">
                                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                                                aria-haspopup="true" aria-expanded="false">分类 <span
                                                    class="caret"></span></a>
                                            <ul class="dropdown-menu">
                                                <!-- 分类内容 -->
                                                <li><a href="#">Action</a></li>
                                            </ul>
                                        </li>
                                    </ul>

                                    <!-- 搜索框 -->
                                    <form class="navbar-form navbar-left search-bar">
                                        <input type="text" placeholder="请输入您要搜索的内容...">
                                        <button type="submit">
                                            <span class="glyphicon glyphicon glyphicon-search"
                                                aria-hidden="true"></span>
                                        </button>
                                    </form>

                                    <!-- 导航条右侧 -->
                                    <ul class="nav navbar-nav navbar-right">
                                        <li><a href="#">上传音乐</a></li>
                                        <li class="dropdown">
                                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                                                aria-haspopup="true" aria-expanded="false">用户 <span
                                                    class="caret"></span></a>
                                            <ul class="dropdown-menu">
                                                <li><a href="#">我的收藏</a></li>
                                                <li><a href="#">退出</a></li>
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
                                                    <select class="form-control" name="genre"
                                                        id="inputSongGenre"></select>
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
                                                    <button class="btn btn-warning"
                                                        onclick="$('#uploadModel').modal('hide')">取消</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div><!-- /.modal-content -->
                            </div><!-- /.modal-dialog -->
                        </div><!-- /.modal -->
                    </div>

                </div>

            </body>

            </html>