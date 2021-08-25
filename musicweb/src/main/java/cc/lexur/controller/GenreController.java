package cc.lexur.controller;

import cc.lexur.pojo.Genre;
import cc.lexur.pojo.Msg;
import cc.lexur.services.GenreService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @Auther: lexur
 * @Date: 2021/8/24
 * @Description: cc.lexur.controller
 * @version: 1.0
 */
@Service
@RequestMapping("genre")
public class GenreController {

    @Autowired
    GenreService genreService;

    @RequestMapping("/page")
    @ResponseBody
    public Msg getPage(@RequestParam(name = "pn", defaultValue = "-1") int pn, @RequestParam(name = "size", defaultValue = "8") int size){
        List<Genre> genre = genreService.getGenre(pn,size);
        PageInfo pageInfo = new PageInfo(genre);
        return Msg.success().add("pageInfo",pageInfo);
    }

}
