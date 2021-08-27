# 音乐网站
## 架构
ssm

## 网站结构

### 文件上传服务器

api:

上传：

```javascript
{
    url:''
    
}
```

返回数据：

```javascript
{
    //文件名

    //服务器地址
    //文件路径
    //文件访问url：服务器地址+文件路径
}
```

## 数据库分析

### 一、需求分析

管理员系统：

用户系统：

音乐系统：

收藏：

评论：

### 二、数据库设计

#### 1.1 整体设计

| 表名称  |     说明      |
| :------ | :-----------: |
| admin   | 管理员信息表  |
| user    |  用户信息表   |
| genre   |   各区分类    |
| song    |  歌曲信息表   |
| collect |    收藏表     |
| comment |    评论表     |
|         | 浏览记录Redis |

#### 1.2 管理员信息表

表名：admin

>   登录：用户名+密码

| 列名       | 数据类型    | 约束     | 说明                     |
| ---------- | ----------- | -------- | ------------------------ |
| id         | int         | 非空唯一 | 主键                     |
| username   | varchar(30) | 非空唯一 | 用户名                   |
| password   | varcha(50)  | 非空     | 密码                     |
| ~~mobile~~ | varchar(11) |          | 手机号                   |
| email      | varchar(25) |          | 邮箱                     |
| enable     | varchar(1)  | 非空     | Y：启用 N：禁用 默认启用 |

#### 1.3 用户信息表

用户名：user

>   登录：邮箱+密码

| 列名       | 数据类型     | 约束     | 说明                     |
| ---------- | ------------ | -------- | ------------------------ |
| id         | int          | 非空唯一 | 主键                     |
| ~~mobile~~ | varchar(11)  | 唯一     |                          |
| mail       | varchar(25)  | 非空唯一 | 邮箱最为用户登录账号     |
| password   | varchar(50)  | 非空     | 密码                     |
| nickname   | varchar(20)  |          | 昵称（可以使用昵称登录） |
| avatar     | varchar(300) | 非空     | 用户头像                 |
| locked     | char(1)      | 非空     | Y：锁定 N：正常 默认正常 |

#### 1.4 音乐分类

表名：genre

| 列名 | 数据类型    | 约束     | 说明     |
| ---- | ----------- | -------- | -------- |
| id   | int         | 非空唯一 | 主键     |
| name | varchar(20) | 非空唯一 | 名称     |
| desc | varchar(50) |          | 分类描述 |

#### 1.5 音乐信息表

表名：song

| 列名         | 数据类型     | 约束     | 说明                                |
| ------------ | ------------ | -------- | ----------------------------------- |
| id           | bigint       | 非空唯一 | 主键                                |
| genre_id     | int          |          | 外键 分类ID                         |
| admin_id     | int          |          | 外键 上传歌曲管理员ID               |
| title        | varchar(255) | 非空     | 歌曲名称                            |
| source       | varchar(300) | 非空     | 音乐链接                            |
| poster       | varchar(300) | 非空     | 音乐图片                            |
| author       | varchar(20)  |          | 音乐作者，使用“,”间隔               |
| collections  | bigint       | 非空     | 音乐收藏量                          |
| status       | int          | 非空     | 发布状态 0:未发布 1:已发布 2:已下线 |
| publish_time | timestamp    |          | 发布时间                            |
| offline_time | timestamp    |          | 下线时间                            |
| create_time  | timestamp    | 非空     | 创建时间                            |

#### 1.6 评论表

>   1.   音乐的评论（根节点）
>   1.   对评论的评论（树形结构）
>
>   方案一（多表）：评论表 回复表
>
>   方案二（单表）：父子表
>
>   ​	实现：id与parent_id

表名：comment

| 列名        | 数据类型  | 约束     | 说明                                                |
| ----------- | --------- | -------- | --------------------------------------------------- |
| id          | int       | 非空唯一 | 主键                                                |
| song_id     | int       | 非空     | 歌曲ID                                              |
| user_id     | int       | 非空     | 用户ID                                              |
| parent_id   | int       |          | 指向上级评论的ID，<br/>如果是对歌曲的评论，值为null |
| content     | text      | 非空     | 评论内容                                            |
| create_time | timestamp | 非空     | 创建时间                                            |

#### 1.7 收藏表

>   一个用户收藏多首音乐，一首歌可以被多个用户收藏
>   多对多：中间表

表名：collect

| 列名    | 数据类型 | 约束     | 说明   |
| ------- | -------- | -------- | ------ |
| id      | int      | 非空唯一 | 主键   |
| song_id | int      | 非空     | 歌曲ID |
| user_id | int      | 非空     | 用户ID |



#### 要点总结

-   一对多关系:添加外键
-   多对多关系:中间表
-   大文本:
-   id很多情况：bigint
-   树状结构：父子表
-   删除元素：逻辑删除
-   外键的删除更新时操作都改为no ation,使用程序来实现，不使用数据库实现





## 音乐网站服务器

## API接口

### 1、管理员

#### 1.1 登录

##### 请求参数

>   请求网址：localhost:2001/admin/login
>
>   方法：POST

| 名称     | 类型   | 是否必需 | 描述   |
| :------- | :----- | :------- | :----- |
| username | String | 是       | 用户名 |
| password | String | 是       | 密码   |

##### 响应元素

>   说明：返回为html页面

登录失败：返回error.jsp页面，过5面后自动跳转错误页面

登录成功：返回musicweb-admin.jsp页面

#### 1.2 用户信息

##### 请求参数

>   请求网址：localhost:2001/admin/page
>
>   方法：GET

| 名称 | 类型 | 是否必需 | 描述            |
| :--- | :--- | :------- | :-------------- |
| pn   | int  | 是       | 页码            |
| size | int  | 否       | 页面大小，默认8 |

##### 响应元素

>   说明：返回为json数据

```json
{
    "code": 100,
    "msg": "处理成功!",
    "extend": {
        "pageInfo": {}
    }
}
```

#### 1.3 添加用户

##### 请求参数

>   请求网址：localhost:2001/admin/addUser
>
>   方法：POST

| 名称     | 类型   | 是否必需 | 描述 |
| :------- | :----- | :------- | :--- |
| mail     | String | 是       | 邮箱 |
| password | String | 是       | 密码 |
| nickname | String | 否       | 昵称 |
| phone    | String | 否       | 电话 |
| avatar   | String | 否       | 头像 |
| birth    | Date   | 否       | 生日 |

##### 响应元素

>   说明：返回为json数据

【1】添加成功:code=100

```json
{
    "code": 100,
    "msg": "处理成功!",
    "extend": {
        "user": {
            "id": 6,
            "phone": "",
            "mail": "",
            "password": "",
            "nickname": "",
            "avatar": "",
            "locked": "N",
            "birth": 
        }
    }
}
```

【2】添加失败:code=200

```json
{
    "code": 200,
    "msg": "该邮箱已注册！",
    "extend": {}
}
```



#### 1.4 删除用户

##### 请求参数

>   请求网址：localhost:2001/admin/deleteUser
>
>   方法：GET/POST

| 名称 | 类型 | 是否必需 | 描述 |
| :--- | :--- | :------- | :--- |
| id   | int  | 是       | id   |

##### 响应元素

>   说明：返回为json数据

【1】删除成功:code=100

```json
{
    "code": 100,
    "msg": "处理成功!",
    "extend": {
        "deleteUser": {
            "id": ,
            "phone": "",
            "mail": "",
            "password": "",
            "nickname": "",
            "avatar": "",
            "locked": "N",
            "birth": 
        }
    }
}
```

【2】删除失败:code=200

```json
{
    "code": 200,
    "msg": "用户不存在",
    "extend": {}
}
```

#### 1.5 修改用户

##### 请求参数

>   请求网址：localhost:2001/admin/updateUser
>
>   方法：POST

| 名称 | 类型 | 是否必需 | 描述 |
| :--- | :--- | :------- | :--- |
| id   | int  | 是       | id   |
| mail     | String | 否  | 邮箱 |
| password | String | 否  | 密码 |
| nickname | String | 否   | 昵称 |
| phone    | String | 否   | 电话 |
| avatar   | String | 否   | 头像 |
| birth    | Date   | 否   | 生日 |
| locked | Boolean | 否 | 状态 |

##### 响应元素

>   说明：返回为json数据

【1】更新成功:code=100

```json
{
    "code": 100,
    "msg": "处理成功!",
    "extend": {
        "user": {
            "id": 4,
            "phone": null,
            "mail": null,
            "password": "456",
            "nickname": "bbb",
            "avatar": null,
            "locked": "N",
            "birth": null
        }
    }
}
```

【2】更新失败:code=200

```json
{
    "code": 200,
    "msg": "处理失败！",
    "extend": {}
}
```

### 2. 分类

#### 2.1 分类添加

##### 请求参数

>   请求网址：localhost:2001/genre/addGenre
>
>   方法：POST

| 名称        | 类型   | 是否必需 | 描述     |
| :---------- | :----- | :------- | :------- |
| name        | String | 是       | 分类名称 |
| description | String | 否       | 描述     |

>   注意如果descrption使用缩写desc会与关键字冲突！

##### 响应元素

>   说明：返回为json数据

【1】添加成功:code=100

```
{
    "code": 100,
    "msg": "处理成功!",
    "extend": {}
}
```

【2】添加失败:code=200

```
{
    "code": 200,
    "msg": "分类已存在",
    "extend": {}
}
```

#### 2.2 分类查询

##### 请求参数

>   请求网址：localhost:2001/genre/page
>
>   方法：GET

| 名称 | 类型 | 是否必需 | 描述     |
| :--- | :--- | :------- | :------- |
| pn   | int  | 是       | 页码     |
| size | int  | 否       | 页面大小 |


##### 响应元素

>   说明：返回为json数据

【1】成功:code=100

```json
{
    "code": 100,
    "msg": "处理成功!",
    "extend": {
        "pageInfo": {
            "total": 0,
            "list": [],
            "pageNum": 1,
            "pageSize": 8,
            "size": 0,
            "startRow": 0,
            "endRow": 0,
            "pages": 0,
            "prePage": 0,
            "nextPage": 0,
            "isFirstPage": true,
            "isLastPage": true,
            "hasPreviousPage": false,
            "hasNextPage": false,
            "navigatePages": 8,
            "navigatepageNums": [],
            "navigateFirstPage": 0,
            "navigateLastPage": 0
        }
    }
}
```



#### 2.3 分类删除

##### 请求参数

>   请求网址：localhost:2001/genre/deleteGenre
>
>   方法：GET

| 名称 | 类型 | 是否必需 | 描述 |
| :--- | :--- | :------- | :--- |
| id   | int  | 是       | id   |

##### 响应元素

>   说明：返回为json数据

【1】添加成功:code=100

```
{
    "code": 100,
    "msg": "处理成功!",
    "extend": {}
}
```

【2】添加失败:code=200

```
{
    "code": 200,
    "msg": "用户不存在",
    "extend": {}
}
```


#### 2.4 分类修改

##### 请求参数

>   请求网址：localhost:2001/genre/updateGenre
>
>   方法：POST

| 名称        | 类型   | 是否必需 | 描述     |
| :---------- | :----- | :------- | :------- |
| id          | int    | 是       | id       |
| name        | String | 否       | 分类名称 |
| description | String | 否       | 描述     |

##### 响应元素

>   说明：返回为json数据

【1】添加成功:code=100

```
{
    "code": 100,
    "msg": "处理成功!",
    "extend": {}
}
```

【2】添加失败:code=200

```
{
    "code": 200,
    "msg": "分类不存在",
    "extend": {}
}
```

###3. 音乐管理

#### 3.1 音乐信息

##### 请求参数

>   请求网址：localhost:2001/song/page
>
>   方法：POST

| 名称 | 类型 | 是否必需 | 描述     |
| :--- | :--- | :------- | :------- |
| pn   | int  | 否       | 页码     |
| size | int  | 否       | 页面大小 |

##### 响应元素

>   说明：返回为json数据

```json
{
    "code": 100,
    "msg": "处理成功!",
    "extend": {
        "pageInfo": {
            "total": 0,
            "list": [],
            "pageNum": 1,
            "pageSize": 8,
            "size": 0,
            "startRow": 0,
            "endRow": 0,
            "pages": 0,
            "prePage": 0,
            "nextPage": 0,
            "isFirstPage": true,
            "isLastPage": true,
            "hasPreviousPage": false,
            "hasNextPage": false,
            "navigatePages": 8,
            "navigatepageNums": [],
            "navigateFirstPage": 0,
            "navigateLastPage": 0
        }
    }
}
```



#### 3.2 添加音乐

##### 请求参数

>   请求网址：localhost:2001/song/addSong
>
>   方法：POST

| 名称     | 类型   | 是否必需 | 描述       |
| :------- | :----- | :------- | :--------- |
| genre_id | int    | 是       | 分类id     |
| admin_id | int    | 是       | 上传人员id |
| title    | String | 是       | 标题       |
| language | String | 否       | 语言       |
| source   | String | 是       | 歌曲链接   |
| poster   | String | 是       | 歌曲封面   |
| author   | String | 否       | 歌曲作者   |


##### 响应元素

>   说明：返回为json数据

```json
{
    "code": 100,
    "msg": "处理成功!",
    "extend": {
        "song": {
            "id": null,
            "genreId": 1,
            "adminId": null,
            "title": "",
            "language": "",
            "source": "",
            "poster": "",
            "author": "",
            "collection": 0,
            "status": 1,
            "publishTime": null,
            "offlineTime": null,
            "createTime": null
        }
    }
}
```

#### 3.3 删除音乐

##### 请求参数

>   请求网址：localhost:2001/song/deleteSong
>
>   方法：POST

| 名称 | 类型 | 是否必需 | 描述 |
| :--- | :--- | :------- | :--- |
| id   | int  | 是       | id   |


##### 响应元素

>   说明：返回为json数据

【1】处理成功

```json
{
    "code": 100,
    "msg": "处理成功!",
    "extend": {}
}
```

【2】处理失败

```json
{
    "code": 200,
    "msg": "用户不存在",
    "extend": {}
}
```



#### 3.4 修改音乐

##### 请求参数

>   请求网址：localhost:2001/song/updateSong
>
>   方法：POST

| 名称     | 类型   | 是否必需 | 描述       |
| :------- | :----- | :------- | :--------- |
| id       | int    | 是       | 修改音乐id |
| genre_id | int    | 否       | 分类id     |
| title    | String | 否       | 标题       |
| language | String | 否       | 语言       |
| source   | String | 否       | 歌曲链接   |
| poster   | String | 否       | 歌曲封面   |
| author   | String | 否       | 歌曲作者   |
| status   | int    | 否       | 歌曲状态   |

##### 响应元素

>   说明：返回为json数据

【1】处理成功

```json
{
    "code": 100,
    "msg": "处理成功!",
    "extend": {
        "song": {
            "id": 6,
            "genreId": 2,
            "adminId": null,
            "title": "test",
            "language": "汉语",
            "source": null,
            "poster": null,
            "author": "未知",
            "collection": 0,
            "status": 0,
            "publishTime": null,
            "offlineTime": null,
            "createTime": null
        }
    }
}
```

【2】处理失败

```json
{
    "code": 200,
    "msg": "歌曲不存在",
    "extend": {}
}
```

#### 3.5 按名称查询

##### 请求参数

>   请求网址：localhost:2001/song/title
>
>   方法：GET

| 名称  | 类型   | 是否必需 | 描述     |
| :---- | :----- | :------- | :------- |
| title | String | 是       | 音乐名称 |


##### 响应元素

>   说明：返回为json数据

【1】处理成功

```json
{
    "code": 100,
    "msg": "处理成功!",
    "extend": {
        "song": {
            "id": 6,
            "genreId": 2,
            "adminId": null,
            "title": "test",
            "language": "汉语",
            "source": null,
            "poster": null,
            "author": "未知",
            "collection": 0,
            "status": 0,
            "publishTime": null,
            "offlineTime": null,
            "createTime": null
        }
    }
}
```

【2】处理失败

```json
{
    "code": 200,
    "msg": "歌曲不存在",
    "extend": {}
}
```

#### 

#### 3.6 按分类查询

##### 请求参数

>   请求网址：localhost:2001/song/genre
>
>   方法：GET

| 名称 | 类型 | 是否必需 | 描述     |
| :--- | :--- | :------- | :------- |
| id   | int  | 是       | 分类名称 |


##### 响应元素

>   说明：返回为json数据

【1】处理成功

```json
{
    "code": 100,
    "msg": "处理成功!",
    "extend": {
        "song": {
            "id": 6,
            "genreId": 2,
            "adminId": null,
            "title": "test",
            "language": "汉语",
            "source": null,
            "poster": null,
            "author": "未知",
            "collection": 0,
            "status": 0,
            "publishTime": null,
            "offlineTime": null,
            "createTime": null
        }
    }
}
```

【2】处理失败

```json
{
    "code": 200,
    "msg": "歌曲不存在",
    "extend": {}
}
```

#### 

### 4. 用户

#### 4.1 登录

##### 请求参数

>   请求网址：localhost:2001/user/login
>
>   方法：POST

| 名称     | 类型   | 是否必需 | 描述 |
| :------- | :----- | :------- | :--- |
| mail     | String | 是       | 邮箱 |
| password | String | 是       | 密码 |

##### 响应元素

>   说明：返回为jsp页面

【1】登录成功:music.jsp

【2】登录失败:error.jsp，5秒后返回登录页面

#### 4.2 注册

##### 请求参数

>   请求网址：localhost:2001/user/register
>
>   方法：POST

| 名称     | 类型   | 是否必需 | 描述 |
| :------- | :----- | :------- | :--- |
| mail     | String | 是       | 邮箱 |
| password | String | 是       | 密码 |
| nickname | String | 否       | 昵称 |
| phone    | String | 否       | 电话 |
| avatar   | String | 否       | 头像 |
| birth    | Date   | 否       | 生日 |

### 4.3 收藏/取消收藏

