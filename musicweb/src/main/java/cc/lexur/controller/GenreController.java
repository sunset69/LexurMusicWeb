package cc.lexur.controller;

import cc.lexur.pojo.Genre;
import cc.lexur.pojo.Msg;
import cc.lexur.services.GenreService;
import com.github.pagehelper.PageInfo;
import com.sun.org.apache.bcel.internal.generic.GETFIELD;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.swing.plaf.nimbus.NimbusLookAndFeel;
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
        List<Genre> genreList = genreService.getGenre(pn,size);
        PageInfo pageInfo = new PageInfo(genreList);
        return Msg.success().add("genreList",genreList).add("pageInfo",pageInfo);
    }

    /**
     * 添加分类
     * @param name
     * @param description
     * @return
     */
    @RequestMapping(value = "/addGenre",method = RequestMethod.POST)
    @ResponseBody
    public Msg addGenre(@RequestParam String name, String description){
        Genre genre = new Genre();
        if (name == null || name == ""){
            return Msg.fail().setMsg("分类名不能为空");
        }
        genre.setName(name);
        genre.setDescription(description);
        System.out.println(genre.toString());
        if(!genreService.addGenre(genre)){
            return Msg.fail().setMsg("分类已存在");
        }
        return Msg.success();
    }

    /**
     * 删除分类
     * @param id
     * @return
     */
    @RequestMapping("/deleteGenre")
    @ResponseBody
    public Msg deleteGenre(@RequestParam int id){
        if(genreService.deleteGenre(id)){
            return Msg.success();
        }
        return Msg.fail().setMsg("用户不存在");
    }

    /**
     * 修改分类
     * @param id
     * @param name
     * @param description
     * @return
     */
    @RequestMapping("/updateGenre")
    @ResponseBody
    public Msg updateGenre(@RequestParam int id,String name,String description){
        Genre genre = new Genre();
        genre.setId(id);
        genre.setName(name);
        genre.setDescription(description);
        if (name == null || name == ""){
            //return Msg.fail().setMsg("分类名不能为空");
            genre.setName(null);
        }
        if (!genreService.updateGenre(genre)){
            return Msg.fail().setMsg("分类不存在");
        }
        return Msg.success();
    }

    @RequestMapping("/getGenre")
    @ResponseBody
    public Msg getGenre(@RequestParam int id){
        Genre genre = genreService.getGenreById(id);
        if (genre == null){
            return Msg.fail().setMsg("分类不存在");
        }else {
            return Msg.success().add("genre",genre);
        }
    }

}
