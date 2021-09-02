package cc.lexur.controller;

import cc.lexur.mapper.UserMapper;
import cc.lexur.pojo.Msg;
import cc.lexur.services.CollectService;
import cc.lexur.services.SongService;
import cc.lexur.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @Auther: lexur
 * @Date: 2021/8/27
 * @Description: cc.lexur.controller
 * @version: 1.0
 */
@Controller
@RequestMapping("/collect")
public class CollectController {

    @Autowired
    CollectService collectService;

    @Autowired
    UserService userService;

    @Autowired
    SongService songService;

    /**
     * 添加收藏
     * @param userId
     * @param songId
     * @return
     */
    @RequestMapping("/add")
    @ResponseBody
    public Msg add(@RequestParam int userId,@RequestParam int songId){
        //boolean add = collectService.add(userId, songId);

        if (!userService.checkId(userId)){
            return Msg.fail().setMsg("用户不存在");
        }
        if (!songService.checkId(songId)){
            return Msg.fail().setMsg("音乐不存在");
        }

        if (!collectService.add(userId, songId)){
            return Msg.fail().setMsg("添加收藏失败");
        }
        return Msg.success().setMsg("成功添加收藏");
    }

    /**
     * 取消收藏
     * @param userId
     * @param songId
     * @return
     */
    @RequestMapping("/delete")
    @ResponseBody
    public Msg delete(@RequestParam int userId,@RequestParam int songId){

        if (!userService.checkId(userId)){
            return Msg.fail().setMsg("用户不存在");
        }

        if (!collectService.delete(userId,songId)) {
            return Msg.fail().setMsg("取消收藏失败");
        }
        return Msg.success().setMsg("已取消收藏");
    }

    /**
     * 检查是否收藏
     * @param userId
     * @param songId
     * @return
     */
    @RequestMapping("/check")
    @ResponseBody
    public Msg check(@RequestParam int userId,@RequestParam int songId){
        if (collectService.check(userId,songId)){
            return Msg.success().setMsg("已收藏");
        }else {
            return Msg.fail().setMsg("未收藏");
        }
    }

    /**
     * 展示所有收藏
     * @param userId
     * @return
     */
    @RequestMapping("/show")
    @ResponseBody
    public Msg show(@RequestParam int userId){
        if (!userService.checkId(userId)){
            return Msg.fail().setMsg("用户不存在");
        }
        collectService.show(userId);
        return Msg.success();
    }

}
