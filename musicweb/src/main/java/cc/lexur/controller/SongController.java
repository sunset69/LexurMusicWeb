package cc.lexur.controller;

import cc.lexur.mapper.SongMapper;
import cc.lexur.pojo.Msg;
import cc.lexur.pojo.Song;
import cc.lexur.pojo.SongExample;
import cc.lexur.pojo.User;
import cc.lexur.services.AdminService;
import cc.lexur.services.GenreService;
import cc.lexur.services.SongService;
import cc.lexur.services.UserService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.ibatis.annotations.Param;
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
@RequestMapping("song")
public class SongController {

    @Autowired
    SongService songService;

    @Autowired
    GenreService genreService;

    //@Autowired
    //AdminService adminService;

    @Autowired
    UserService userService;

    /**
     * 获取未删除音乐分页
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

    /**
     * 获取全部歌曲分页，修改歌曲信息时使用
     * @param pn
     * @param size
     * @return
     */
    @RequestMapping("/allPage")
    @ResponseBody
    public Msg getAllPage(@RequestParam(name = "pn", defaultValue = "0") int pn, @RequestParam(name = "size", defaultValue = "8") int size) {
        List<Song> songList = songService.getAllSongList(pn, size);
        PageInfo pageInfo = new PageInfo(songList);
        return Msg.success().add("pageInfo",pageInfo);
    }

    /**
     * 添加音乐
     * @param genre_id
     * @param admin_id 上传者ID，默认null
     * @param title
     * @param language
     * @param source
     * @param poster
     * @param author
     * @return
     */
    @RequestMapping(value = "/addSong",method = RequestMethod.POST)
    @ResponseBody
    public Msg addSong(@RequestParam(defaultValue = "1") int genre_id,@RequestParam(defaultValue = "0") int admin_id, @RequestParam String title, String language, @RequestParam String source, String poster, String author){
        Song song = new Song();

        if (!genreService.checkId(genre_id)) {
            return Msg.fail().setMsg("分类不存在");
        }else {
            song.setGenreId(genre_id);
        }

        if (title == null || title == ""){
            return Msg.fail().setMsg("标题不能为空");
        }
        if (source == null || source == ""){
            return Msg.fail().setMsg("歌曲链接有问题");
        }
        if (admin_id!= 0 && !userService.checkId(admin_id)){
            return Msg.fail().setMsg("用户不存在");
        }
        if (admin_id == 0){
            song.setAdminId(null);
        }else {
            song.setAdminId(admin_id);
        }
        song.setTitle(title);
        song.setLanguage(language);
        song.setSource(source);
        song.setPoster(poster);
        song.setAuthor(author);
        System.out.println(song.toString());
        songService.addSong(song);
        return Msg.success().add("song",song);
    }


    /**
     * 删除歌曲，使用逻辑删除
     * @param id
     * @return
     */
    @RequestMapping("/deleteSong")
    @ResponseBody
    public Msg deleteSong(@RequestParam int id){
        if (!songService.deleteSong(id)){
            return Msg.fail().setMsg("用户不存在");
        }
        return Msg.success();
    }

    /**
     * 修改音乐信息
     * @param id
     * @param genre_id
     * @param title
     * @param language
     * @param source
     * @param poster
     * @param author
     * @param status
     * @return
     */
    @RequestMapping(value = "/updateSong",method = RequestMethod.POST)
    @ResponseBody
    public Msg updateSong(@RequestParam(required = true,defaultValue = "-1") int id,@RequestParam(defaultValue = "-1") int genre_id,String title, String language,String source, String poster, String author,@RequestParam(defaultValue = "-1") int status){
        Song song = new Song();

        if (!songService.checkId(id)){
            return Msg.fail().setMsg("歌曲不存在");
        }else {
            song.setId(id);
        }

        if (!genreService.checkId(genre_id)){
            return Msg.fail().setMsg("分类ID不存在");
        }else {
            song.setGenreId(genre_id);
        }

        if (title != null && title != ""){
            song.setTitle(title);
        }

        if (language != null && language != ""){
            song.setLanguage(language);
        }

        if (source != null && source != ""){
            song.setSource(source);
        }

        if (poster != null && poster != ""){
            song.setPoster(poster);
        }

        if (author != null && author != ""){
            song.setAuthor(author);
        }

        if (status != -1){
            song.setStatus(status);
        }else {
            song.setStatus(null);
        }
        //songService.updateSong(song);

        System.out.println(song.toString());
        if(!songService.updateSong(song)){
            return Msg.fail().setMsg("用户不存在");
        }
        return Msg.success().add("song",song);
    }

    /**
     * 通过音乐名搜索
     * @param title
     * @return
     */
    @RequestMapping("/title")
    @ResponseBody
    public Msg searchByTitle(@RequestParam String title){
        List<Song> list = songService.searchByTitle(title);
        return Msg.success().add("songList",list);
    }

    /**
     * 通过分类查询
     * @param genre
     * @return
     */
    @RequestMapping("/genre")
    @ResponseBody
    public Msg searchByGenre(@RequestParam String genre){
        List<Song> list = songService.searchByGenre(genre);
        return Msg.success().add("songList",list);
    }

    @RequestMapping("/search")
    @ResponseBody
    public Msg search(String title,@RequestParam(defaultValue = "-1") int genreId, String author,@RequestParam(defaultValue = "0") int pn,@RequestParam(defaultValue = "8") int size){
        System.out.println(title+" "+genreId+" "+author+" "+pn+" "+size);
        if ((title == null || title == "") && genreId == -1 && (author == null || author == "")){
            return Msg.fail();
        }
        List<Song> songList = songService.search(title, genreId, author, pn, size);
        PageInfo pageInfo = new PageInfo(songList);
        return Msg.success().add("pageIndo",pageInfo);
    }
}

