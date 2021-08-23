package cc.lexur.controller;

import cc.lexur.pojo.Msg;
import cc.lexur.pojo.User;
import cc.lexur.services.AdminService;
import cc.lexur.services.UserService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @Auther: lexur
 * @Date: 2021/8/23
 * @Description: cc.lexur.controller
 * @version: 1.0
 */
@Controller
@RequestMapping(value = "/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

    @Autowired
    UserService userService;

    /**
     * 控制台登录
     * @param username
     * @param password
     * @return
     */
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public String login(@RequestParam String username,@RequestParam String password){
        if (adminService.login(username,password)){
            return "musicweb-admin";
        }
        return "error";
    }

    /**
     * 获取用户分页
     * @param pn
     * @param size
     * @return
     */
    @RequestMapping("/page")
    @ResponseBody
    public Msg getPage(@RequestParam(name = "pn", defaultValue = "-1") int pn, @RequestParam(name = "size", defaultValue = "8") int size){
        List<User> list = userService.getUserList(pn, size);
        PageInfo pageInfo = new PageInfo(list);
        return Msg.success().add("pageInfo",pageInfo);
    }

    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    @ResponseBody
    public Msg addUser(@RequestParam String  mail,@RequestParam String password,String nickname,String phone,String avatar,String birth){
        User user = new User();

        // 检查邮箱与密码是否为空
        if (user.getMail() == "" || user.getPassword() == ""){
            return Msg.fail();
        }
        user.setMail(mail);
        user.setPassword(password);

        // 如果未上传用户名则使用邮箱作为用户名
        if (nickname == null || nickname == ""){
            user.setNickname(mail);
        }else {
            user.setNickname(nickname);
        }
        user.setPhone(phone);
        user.setAvatar(avatar);
        System.out.println(user.toString());

        return Msg.success().add("user",user);
    }

}
