package cc.lexur.services.impl;

import cc.lexur.mapper.SongMapper;
import cc.lexur.pojo.Song;
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

    @Override
    public List<Song> getSongList(int pn, int size) {
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
}
