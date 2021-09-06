package cc.lexur.controller;

import cc.lexur.pojo.Msg;
import cc.lexur.pojo.User;
import cc.lexur.services.UserService;
import com.github.pagehelper.PageInfo;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.Date;
import java.util.List;

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
    //@RequestMapping(value = "/login",method = RequestMethod.POST)
    //public String login(@RequestParam String mail, @RequestParam String password, Model model) {
    //    if (userService.login(mail,password)){
    //        List<User> userList = userService.selectByMail(mail);
    //        model.addAttribute("userInfo",userList);
    //        model.addAttribute("test","test model");
    //        return "music";
    //    }
    //    return "error";
    //}
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public ModelAndView login(@RequestParam String mail, @RequestParam String password, Model model) {
        ModelAndView mv=new ModelAndView();
        if (userService.login(mail,password)){
            List<User> userList = userService.selectByMail(mail);
            mv.setViewName("music");
            mv.addObject("userInfo", userList.get(0));
            mv.addObject("msgTest",Msg.success());
            return mv;
        }else {
            mv.setViewName("error");
            return mv;
        }

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

    @RequestMapping("/page")
    @ResponseBody
    public Msg getPage(@RequestParam(name = "pn", defaultValue = "0") int pn, @RequestParam(name = "size", defaultValue = "8") int size){
        List<User> list = userService.getUserList(pn, size);
        PageInfo<User> pageInfo = new PageInfo<>(list);
        return Msg.success().add("pageInfo",pageInfo);
    }

}
