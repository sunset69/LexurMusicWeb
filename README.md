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
    "extend": {}
}
```

【2】删除失败:code=200

```json
{
    "code": 200,
    "msg": "该邮箱已注册！",
    "extend": {}
}
```

