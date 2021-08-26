package cc.lexur.controller;

import cc.lexur.pojo.Msg;
import cc.lexur.pojo.User;
import cc.lexur.services.UserService;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;

/**
 * @Auther: lexur
 * @Date: 2021/8/23
 * @Description: cc.lexur.controller
 * @version: 1.0
 */
@Service
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    /**
     * 用户登录
     * @param mail
     * @param password
     * @return
     */
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public String login(@RequestParam String mail, @RequestParam String password){
        if (userService.login(mail,password)){
            return "music";
        }
        return "error";
    }

    @RequestMapping(value = "/register",method = RequestMethod.POST)
    @ResponseBody
    public Msg register(@RequestParam String  mail, @RequestParam String password, String nickname, String phone, String avatar, Date birth){
        User user = new User();
        if (mail == null || mail == ""){
            return Msg.fail().setMsg("账号错误");
        }
        if (password == null || password == ""){
            return Msg.fail().setMsg("密码错误");
        }
        if (password == null || password == ""){
            return Msg.fail().setMsg("密码错误");
        }
        return Msg.success();
    }

}
