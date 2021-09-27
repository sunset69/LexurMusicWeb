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
    <script src="${APP_PATH}/static/js/utils.js"></script>
    <link rel="stylesheet" href="${APP_PATH}/static/css/musicweb-admin.css">
</head>
<body>
<div class="container">
    <!-- 标题 -->
    <div class="row">
        <div class="jumbotron">
            <h1 class="text-center">Lexur music 控制台</h1>
        </div>
    </div>

    <!-- 导航栏 -->
    <div class="row">
        <ul class="nav nav-tabs navbar-left">
            <li role="presentation" class="active" index="1"><a href="#">用户管理</a></li>
            <li role="presentation" index="2"><a href="#">音乐管理</a></li>
            <li role="presentation" index="3"><a href="#">分类管理</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
            <li><a href="javascript:;" id="add_user">上传用户</a></li>
            <li><a href="javascript:;" id="add_song">上传音乐</a></li>
            <li><a href="javascript:;" id="add_genre">上传分类</a></li>
            <li><a href="/">退出</a></li>
        </ul>
    </div>

    <!-- 用户管理 -->
    <div class="row" id="user_page">
        <table class="table table-striped" id="user_table">
            <tr>
                <th>id</th>
                <th>mail</th>
                <th>password</th>
                <th>nickname</th>
                <th>avatar</th>
                <th>locked</th>
                <th>birthday</th>
                <th>操作</th>
            </tr>
            <tr>
                <td>1</td>
                <td>123@qq.com</td>
                <td>123</td>
                <td>zhang</td>
                <td>...</td>
                <td>Y</td>
                <td>2020-1-1</td>
                <td>
                    <button class="btn btn-success">修改</button>
                    <button class="btn btn-danger">删除</button>
                </td>
            </tr>
        </table>
        <div id="user_page_info_area"></div>
        <div class="col-md-8 col-md-offset-2 text-center" id="user_page_nav_area"></div>
    </div>
    <!-- 音乐管理 -->
    <div class="row hidden" id="song_page">
        <table class="table table-striped table-hover" id="song_table">

        </table>
        <div id="song_page_info_area"></div>
        <!-- 分页条信息 -->
        <div class="col-md-8 col-md-offset-2 text-center" id="song_page_nav_area"></div>
    </div>
    <!-- 分类管理 -->
    <div class="row hidden" id="genre_page">
        <table class="table table-striped table-hover" id="genre_table">

        </table>
        <div id="genre_page_info_area"></div>
        <div class="col-md-8 col-md-offset-2 text-center" id="genre_page_nav_area"></div>
    </div>

    <div class="all_modal">


        <!-- 用户信息 -->
        <div class="modal fade" tabindex="-1" role="dialog" id="user_info">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">用户信息修改</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label>ID</label>
                                <input type="text" class="form-control" id="modifyUserIdForm" disabled>
                            </div>
                            <div class="form-group">
                                <label>邮箱</label>
                                <input type="email" class="form-control" id="modifyMailForm" placeholder="Email">
                            </div>
                            <div class="form-group">
                                <label>昵称</label>
                                <input type="email" class="form-control" id="modifyNicknameForm" placeholder="昵称">
                            </div>
                            <div class="form-group">
                                <label>密码</label>
                                <input type="password" class="form-control" id="modifyPasswordForm"
                                       placeholder="密码至少6位">
                            </div>
                            <div class="form-group">
                                <label>手机</label>
                                <input type="tel" class="form-control" id="modifyPhoneForm" placeholder="手机号码">
                            </div>
                            <div class="form-group">
                                <label>状态:
                                    <input type="checkbox" id="modifyLockedForm" value="Y"> 是否被禁用
                                </label>
                            </div>
                            <div class="form-group">
                                <label>出生日期</label>
                                <input type="date" class="form-control" id="modifyBirthForm" placeholder="手机号码">
                            </div>

                            <!-- 将图片上传至图片服务器，获取链接后注册用户 -->
                            <div class="form-group">
                                <label>头像</label>
                                <input type="file" class="form-control" id="modifycAvatarForm"
                                       accept=".png, .jpg, .jpeg">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button id="submit_user_modify" class="btn btn-success">提交</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <!-- 音乐修改模态框 -->
        <div class="modal fade" tabindex="-1" role="dialog" id="song_info">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">音乐信息修改</h4>
                    </div>
                    <div class="modal-body">

                        <form>
                            <div class="form-group">
                                <label>ID</label>
                                <input type="text" class="form-control" id="modifySongIdForm" disabled>
                            </div>
                            <div class="form-group">
                                <label>歌名</label>
                                <input type="text" class="form-control" id="modifySongTitleForm" placeholder="歌名">
                            </div>
                            <div class="form-group">
                                <label>歌手</label>
                                <input type="text" class="form-control" id="modifySongAuthorForm" placeholder="歌手">
                            </div>
                            <div class="form-group">
                                <label>语言</label>
                                <input type="text" class="form-control" id="modifySongLanguageForm"
                                       placeholder="语言" value="未知">
                            </div>
                            <!-- 将图片上传至图片服务器，获取链接后注册用户 -->
                            <div class="form-group">
                                <label>上传歌曲</label>
                                <input type="file" id="modifySongSourceForm" required>
                            </div>
                            <div class="form-group">
                                <label>上传封面</label>
                                <input type="file" id="modifySongPosterForm" required>
                            </div>
                            <div class="form-group">
                                <label>分类</label>
                                <select class="form-control" name="genre" id="modifySongGenreForm"></select>
                            </div>
                            <div class="form-group">
                                <label>歌曲状态
                                    <select class="form-control" id="modifySongStatus">
                                        <option value="0">未发布</option>
                                        <option value="1">已发布</option>
                                        <option value="2">已下线</option>
                                    </select>
                                </label>
                            </div>
                        </form>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-success" id="submit_song_modify">提交</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <!-- 分类修改模态框 -->
        <div class="modal fade" tabindex="-1" role="dialog" id="genre_info">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="分类修改">Modal title</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label>ID</label>
                                <input type="text" class="form-control" id="modifyGenreIdForm" disabled>
                            </div>
                            <div class="form-group">
                                <label>名称</label>
                                <input type="email" class="form-control" id="modifyGenreNameForm" placeholder="分类名称">
                            </div>
                            <div class="form-group">
                                <label>描述</label>
                                <input type="text" class="form-control" id="modifyDescriptionForm" placeholder="分类描述">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-success" id="submit_genre_modify">提交</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->


        <!-- 提示模态框 -->
        <div class="modal" tabindex="-1" role="dialog" id="info_modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">提示信息</h4>
                    </div>
                    <div class="modal-body">
                        <p>info</p>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <!-- 添加用户 -->
        <div class="modal fade" id="user_add_modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">上传用户</h4>
                    </div>
                    <div class="modal-body">

                        <form>
                            <div class="form-group">
                                <label>头像</label>
                                <div class="center">
                                    <label id="preAvatar" class="center">
                                        <img src="" alt="">
                                    </label>
                                    <input type="file" class="form-control" id="registercAvatarForm"
                                           accept="image/*">
                                </div>
                            </div>
                            <div class="form-group">
                                <label>邮箱</label>
                                <input type="email" class="form-control" id="registerMailForm" placeholder="Email">
                            </div>
                            <div class="form-group">
                                <label>昵称</label>
                                <input type="text" class="form-control" id="registerNicknameForm" placeholder="昵称">
                            </div>
                            <div class="form-group">
                                <label>密码</label>
                                <input type="password" class="form-control" id="registerPasswordForm"
                                       placeholder="密码至少6位">
                            </div>
                            <div class="form-group">
                                <label>手机</label>
                                <input type="tel" class="form-control" id="registerPhoneForm" placeholder="手机号码">
                            </div>
                        </form>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" id="upload_user_btn">上传</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">取消</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <!-- 添加音乐 -->
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
                                    <input type="file" id="inputSongFile" required accept="audio/*">
                                    <small id="inputSongFile_info"></small>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">上传封面</label>
                                <div class="col-sm-10">
                                    <input type="file" id="inputPoster" accept="image/*">
                                    <small id="inputPoster_info"></small>
                                </div>
                            </div>
                        </form>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" id="upload_song_btn">添加</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <!-- 添加分类 -->
        <div class="modal fade" id="genre_add_modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">上传分类</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label>名称</label>
                                <input type="text" class="form-control" id="genreNameForm" placeholder="昵称">
                            </div>
                            <div class="form-group">
                                <label>描述</label>
                                <input type="text" class="form-control" id="genreDescForm" placeholder="分类描述">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" id="upload_genre_btn">添加</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">取消</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

    </div>

    <!-- js代码 -->
    <script>
        $(function () {
            // console.log("欢迎进入控制台！");
            // console.log("                   //\n" +
            //         "       \\\\         //\n" +
            //         "        \\\\       //\n" +
            //         "##DDDDDDDDDDDDDDDDDDDDDD##\n" +
            //         "## DDDDDDDDDDDDDDDDDDDD ## \n" +
            //         "## hh                hh ##\n" +
            //         "## hh    //    \\\\    hh ##\n" +
            //         "## hh   //      \\\\   hh ##\n" +
            //         "## hh                hh ##\n" +
            //         "## hh      wwww      hh ##\n" +
            //         "## hh                hh ##\n" +
            //         "## MMMMMMMMMMMMMMMMMMMM ##\n" +
            //         "##MMMMMMMMMMMMMMMMMMMMMM##\n" +
            //         "    \\/            \\/\n");

            var selectedUser;
            var selectedSong;
            var selectedGenre;

            // 切换导航栏
            $(".nav-tabs li").click(function () {
                // console.log($(this).children("a").text());
                showPage($(this).attr("index"));
                $(this).addClass("active").siblings("li").removeClass("active");
            });

            // 加载页面
            var PAGESIZE = {
                pn: 1,
                size: 8
            }
            var USERPAGE = "/user/page";
            var SONGPAGE = "/song/allPage";
            var GENREPAGE = "/genre/page";
            to_page(USERPAGE, PAGESIZE, 1);
            to_page(SONGPAGE, PAGESIZE, 2);
            to_page(GENREPAGE, PAGESIZE, 3);

            // 用户删除与修改按钮事件
            $("#user_table").on("click", "button", function () {
                // console.log($(this).text());
                // var user = getUserInfo(this);
                selectedUser = getUserInfo(this);
                if ($(this).hasClass("delete")) {
                    // console.log("delete");
                    delete_user(selectedUser.id);
                } else if ($(this).hasClass("modify")) {
                    // console.log("modify");
                    init_userInfo_modal(selectedUser);
                    $("#user_info").modal({
                        dropdown: "static",
                        keyboard: false
                    });
                }
            });

            $("#submit_user_modify").click(function () {
                var userInfo = get_modify_userInfo();
                modify_user(userInfo);
            });

            $("#song_table").on("click", "button", function () {
                selectedSong = getSongInfo(this);
                if ($(this).hasClass("delete")) {
                    console.log("delete song");
                    delete_song(selectedSong.id);
                } else if ($(this).hasClass("modify")) {
                    init_songInfo_modal(selectedSong);
                    $("#song_info").modal({
                        dropdown: "static",
                        keyboard: false
                    });
                }
            });

            $("#submit_song_modify").click(function () {
                var modifySong = get_modify_songInfo();
                modify_song(modifySong);
            });

            $("#genre_table").on("click", "button", function () {
                console.log("genre操作");
                // var genre = getGenreInfo(this);
                selectedGenre = getGenreInfo(this);
                if ($(this).hasClass("delete")) {
                    console.log("delete genre");
                    delete_genre(selectedGenre.id);
                    to_page(GENREPAGE, PAGESIZE, 3);
                } else if ($(this).hasClass("modify")) {
                    console.log("modify genre");
                    init_genreInfo_modal(selectedGenre);
                    $("#genre_info").modal({
                        backdrop: "static",
                        keyboard: false
                    });

                }
            });

            $("#submit_genre_modify").click(function () {
                // console.log(selectedGenre);
                var modifyGenre = get_modify_genreInfo();
                // TODO 检查数据

                $("#genre_info").modal("hide");
                modify_genre(modifyGenre);
                to_page("/genre/page", PAGESIZE, 3);
            });

            // 添加用户
            $("#registercAvatarForm").change(function () {
                var _URL = window.URL || window.webkitURL;
                var file, img;
                if ((file = this.files[0])) {
                    img = new Image();
                    img.onload = function () {
                        $('#preAvatar>img').attr('src', this.src);
                    };
                    img.src = _URL.createObjectURL(file);
                }
            });

            $("#add_user").click(function () {
                console.log("添加用户");
                $("#user_add_modal").modal({backdrop: "static"});
            });

            $("#upload_user_btn").click(function () {
                // 检查数据
                if (checkAddUser()) return;
                // 获取数据
                var user = getAddUserInfo();
                // 上传数据
                var result = uploadUser(user, alertInfo);
                // 刷新页面
                if (result) {
                    console.log("上传成功刷新页面");
                    to_page(USERPAGE, PAGESIZE, 1);
                }
            });

            // 添加歌曲
            $("#add_song").click(function () {
                console.log("添加音乐");
                loadGenre("#inputSongGenre")
                $("#song_add_modal").modal({backdrop: "static"});
            });

            $("#upload_song_btn").click(function () {
                // 检查数据
                if (!checkAddSong()) return;
                // 获取数据
                var song = getAddSongInfo();
                // 上传数据
                var result = uploadSong(song, alertInfo);
                // 刷新页面
                if (result) {
                    console.log("上传成功刷新页面");
                    to_page(SONGPAGE, PAGESIZE, 2);
                }
            });

            // 添加分类
            $("#add_genre").click(function () {
                console.log("添加分类");
                $("#genre_add_modal").modal({backdrop: "static"});
            });

            $("#upload_genre_btn").click(function () {
                // 检查数据
                if (checkAddGenre()) return;
                // 获取数据
                var genre = getAddGenreInfo();
                // 上传数据
                var result = uploadGenre(genre, alertInfo);
                // 刷新页面
                if (result) {
                    console.log("上传成功刷新页面");
                    to_page(GENREPAGE, PAGESIZE, 3);
                }
            });

        });
    </script>
</div>
</body>
</html>
