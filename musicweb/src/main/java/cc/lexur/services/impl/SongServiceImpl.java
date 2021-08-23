package cc.lexur.services.impl;

import cc.lexur.mapper.SongMapper;
import cc.lexur.pojo.Song;
import cc.lexur.services.SongService;
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
        List<Song> list = songMapper.selectByExample(null);
        return list;
    }
}
