package cc.lexur.controller;

import cc.lexur.pojo.Genre;
import cc.lexur.pojo.Msg;
import cc.lexur.services.GenreService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

    /**
     * 获取分类分页
     * @param pn
     * @param size
     * @return
     */
    @RequestMapping("/page")
    @ResponseBody
    public Msg getPage(@RequestParam(name = "pn", defaultValue = "-1") int pn, @RequestParam(name = "size", defaultValue = "8") int size){
        List<Genre> genre = genreService.getGenre(pn,size);
        PageInfo pageInfo = new PageInfo(genre);
        return Msg.success().add("pageInfo",pageInfo);
    }

    @RequestMapping(value = "/addGenre",method = RequestMethod.POST)
    @ResponseBody
    public Msg addGenre(@RequestParam String name, String desc){
        Genre genre = new Genre();
        if (name == null || name == ""){
            return Msg.fail().setMsg("分类名不能为空");
        }
        genre.setName(name);
        genre.setDesc(desc);
        System.out.println(genre.toString());
        if(!genreService.addGenre(genre)){
            return Msg.fail().setMsg("分类已存在");
        }
        return Msg.success();
    }

}
