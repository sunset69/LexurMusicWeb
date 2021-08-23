package cc.lexur.controller;

import cc.lexur.mapper.SongMapper;
import cc.lexur.pojo.Msg;
import cc.lexur.pojo.Song;
import cc.lexur.pojo.SongExample;
import cc.lexur.services.SongService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
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
@RequestMapping("song")
public class SongController {

    @Autowired
    SongService songService;

    /**
     * 获取音乐分页
     * @param pn
     * @param size
     * @return
     */
    @RequestMapping("/page")
    @ResponseBody
    public Msg getPage(@RequestParam(name = "pn", defaultValue = "0") int pn, @RequestParam(name = "size", defaultValue = "8") int size) {
        List<Song> songList = songService.getSongList(pn, size);
        PageInfo pageInfo = new PageInfo(songList);
        return Msg.success().add("pageInfo",pageInfo);
    }
}
