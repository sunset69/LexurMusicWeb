package cc.lexur.controller;

import cc.lexur.mapper.UserMapper;
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

import java.util.Date;
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

    /**
     * 添加用户
     * @param mail 必须
     * @param password 必须
     * @param nickname 可选，默认使用邮箱代替
     * @param phone 可选
     * @param avatar 可选，web端使用默认图片
     * @param birth 可选
     * @return
     */
    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    @ResponseBody
    public Msg addUser(@RequestParam String  mail, @RequestParam String password, String nickname, String phone, String avatar, Date birth){
        User user = new User();

        // 检查邮箱与密码是否为空
        if (user.getMail() == "" || user.getPassword() == ""){
            return Msg.fail().setMsg("密码或邮箱不能为空");
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
        user.setBirth(birth);
        if(!userService.selectByMail(mail).isEmpty()){
            return Msg.fail().setMsg("该邮箱已注册！");
        }
        userService.addUser(user);
        user = userService.selectByMail(mail).get(0);
        System.out.println(user.toString());

        return Msg.success().add("user",user);
    }

    @RequestMapping("/deleteUser")
    @ResponseBody
    public Msg deleteUser(@RequestParam int id){
        User user = userService.selectById(id);
        if (user == null){
            return Msg.fail().setMsg("用户不存在");
        }
        if(!userService.deleteUser(id)){
            return Msg.fail();
        }
        return Msg.success().add("deleteUser",user);
    }
}
