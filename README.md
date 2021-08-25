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



### 音乐网站服务器

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

### 

#### 2.3 分类删除



#### 2.4 分类修改

###3. 音乐管理

#### 3.1 音乐信息



#### 3.2 添加音乐



#### 3.3 删除音乐



#### 3.4 修改音乐



#### 3.5 按名称查询



#### 3.6 按分类查询



### 4. 用户

#### 4.1 登录



#### 4.2 注册



#### 4.3 收藏/取消收藏

