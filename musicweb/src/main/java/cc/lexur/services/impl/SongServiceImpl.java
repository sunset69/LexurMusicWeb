package cc.lexur.services.impl;

import cc.lexur.mapper.GenreMapper;
import cc.lexur.mapper.SongMapper;
import cc.lexur.pojo.Genre;
import cc.lexur.pojo.GenreExample;
import cc.lexur.pojo.Song;
import cc.lexur.pojo.SongExample;
import cc.lexur.services.SongService;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Auther: lexur
 * @Date: 2021/8/23
 * @Description: cc.lexur.services.impl
 * @version: 1.0
 */
@Service
public class SongServiceImpl implements SongService {

    @Autowired
    SongMapper songMapper;

    @Autowired
    GenreMapper genreMapper;

    @Override
    public List<Song> getSongList(int pn, int size) {
        SongExample songExample = new SongExample();
        SongExample.Criteria criteria = songExample.createCriteria();
        criteria.andStatusEqualTo(1);

        //进行分页查询
        PageHelper.startPage(pn, size);
        List<Song> list = songMapper.selectByExample(songExample);
        return list;
    }

    @Override
    public List<Song> getAllSongList(int pn, int size) {
        //进行分页查询
        PageHelper.startPage(pn, size);
        List<Song> list = songMapper.selectByExample(null);
        return list;
    }

    @Override
    public boolean addSong(Song song) {
        song.setId(null);
        songMapper.insert(song);
        return true;
    }

    /**
     * 发布状态 0:未发布 1:已发布 2:已下线
     * 删除音乐将song的status改为2
     * @param id
     * @return
     */
    @Override
    public boolean deleteSong(int id) {
        if( songMapper.selectByPrimaryKey(id) == null){
            return false;
        }
        Song song = new Song();
        song.setId(id);
        song.setStatus(2);
        songMapper.updateByPrimaryKeySelective(song);
        return true;
    }

    @Override
    public boolean updateSong(Song song) {
        if (song.getId() == null){
            return false;
        }
        if (songMapper.selectByPrimaryKey(song.getId()) == null){
            return false;
        }
        songMapper.updateByPrimaryKeySelective(song);
        return true;
    }

    @Override
    public boolean checkId(int id) {
        Song song = songMapper.selectByPrimaryKey(id);
        if (song != null){
            System.out.println("歌曲id存在");
            System.out.println(song.toString());
            return true;
        }
        return false;
    }

    @Override
    public List<Song> searchByTitle(String title) {
        SongExample example = new SongExample();
        SongExample.Criteria criteria = example.createCriteria();
        title = "%" + title + "%";
        criteria.andTitleLike(title);
        criteria.andStatusEqualTo(1);
        List<Song> list = songMapper.selectByExample(example);
        return list;
    }

    @Override
    public List<Song> searchByGenre(String name) {
        GenreExample genreExample = new GenreExample();
        GenreExample.Criteria genreExampleCriteria = genreExample.createCriteria();
        genreExampleCriteria.andNameLike("%"+name+"%");
        List<Genre> genreList = genreMapper.selectByExample(genreExample);
        if (genreList.isEmpty()){
            return null;
        }
        int id = genreList.get(0).getId();
        SongExample songExample = new SongExample();
        SongExample.Criteria songExampleCriteria = songExample.createCriteria();
        songExampleCriteria.andGenreIdEqualTo(id);
        songExampleCriteria.andStatusEqualTo(1);
        List<Song> songList = songMapper.selectByExample(songExample);
        return songList;
    }

    @Override
    public List<Song> search(String title, int genreId, String author,int pn,int size) {
        SongExample example = new SongExample();
        SongExample.Criteria criteria = example.createCriteria();
        if (title != "" && title != null){
            criteria.andTitleLike("%"+title+"%");
        }
        if (genreId != -1){
            criteria.andGenreIdEqualTo(genreId);
        }
        if (author != "" && author != null){
            criteria.andAuthorLike("%"+author+"%");
        }

        //进行分页查询
        PageHelper.startPage(pn, size);
        List<Song> list = songMapper.selectByExample(example);
        return list;
    }
}
