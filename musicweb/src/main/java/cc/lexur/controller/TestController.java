package cc.lexur.controller;

import cc.lexur.pojo.Msg;
import cc.lexur.pojo.User;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

/**
 * @Auther: lexur
 * @Date: 2021/9/13
 * @Description: cc.lexur.controller
 * @version: 1.0
 */
@Controller
public class TestController {

    @RequestMapping("/pojo")
    @ResponseBody
    public Msg testPojo(@RequestBody User user){
        System.out.println(user);
        return Msg.success();
    }

    @RequestMapping(value = "/pojo2",method = RequestMethod.POST)
    @ResponseBody
    public Msg testPojo2(@ModelAttribute User user){
        System.out.println(user);
        return Msg.success();
    }
}
