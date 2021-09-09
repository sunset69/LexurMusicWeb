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
    <link rel="stylesheet" href="${APP_PATH}/static/css/musicweb-admin.css">

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
        <!-- 提示模态框 -->
        <div class="modal fade" tabindex="-1" role="dialog" id="info_modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">提示信息</h4>
                    </div>
                    <div class="modal-body">
                        <p>One fine body&hellip;</p>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <!-- 用户信息 -->
        <div class="modal fade" tabindex="-1" role="dialog" id="user_info">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">用户信息</h4>
                    </div>
                    <div class="modal-body">
                        <form>
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
                            <!-- 将图片上传至图片服务器，获取链接后注册用户 -->
                            <div class="form-group">
                                <label>头像</label>
                                <input type="file" class="form-control" id="modifycAvatarForm"
                                       accept=".png, .jpg, .jpeg">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button id="user_info_submit" class="btn btn-success">提交</button>
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
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="音乐修改">Modal title</h4>
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
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-success">提交</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <!-- 分类修改模态框 -->
        <div class="modal fade" tabindex="-1" role="dialog" id="genre_info">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="分类修改">Modal title</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label>名称</label>
                                <input type="email" class="form-control" id="modifyNameForm" placeholder="Name">
                            </div>
                            <div class="form-group">
                                <label>描述</label>
                                <input type="text" class="form-control" id="modifyDescriptionForm" placeholder="分类描述">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-success">提交</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

    </div>

    <!-- js代码 -->
    <script>
        $(function () {
            console.log("欢迎进入控制台！");

            // 切换导航栏
            $(".nav-tabs li").click(function () {
                // console.log($(this).children("a").text());
                showPage($(this).attr("index"));
                $(this).addClass("active").siblings("li").removeClass("active");
            });

            to_page("/user/page",{pn:1,size:8},1);
            to_page("/song/page",{pn:1,size:8},2);
            to_page("/genre/page",{pn:1,size:8},3);

            // 用户删除与修改按钮事件
            $("#user_table").on("click","button",function () {
                // console.log($(this).text());
                var user = getUserInfo(this);
                if ($(this).hasClass("delete")){
                    // console.log("delete");
                    delete_user(user.id);
                }else if ($(this).hasClass("modify")){
                    console.log("modify");
                    $("#user_info").modal("show");
                    init_userInfo_modal(user);
                }
            });
            $("#song_table").on("click","button",function () {
                console.log("song操作")
                if ($(this).hasClass("delete")){
                    console.log("delete");
                }else if ($(this).hasClass("modify")){
                    console.log("modify");
                    $("#song_info").modal("show");
                }
            });
            $("#genre_table").on("click","button",function () {
                console.log("genre操作");
                // TODO 获取数据
                if ($(this).hasClass("delete")){
                    console.log("delete");
                }else if ($(this).hasClass("modify")){
                    console.log("modify");
                    $("#genre_info").modal("show");
                }
            });

        });
    </script>
</div>
</body>
</html>
