package cc.lexur.services.impl;

import cc.lexur.mapper.CollectMapper;
import cc.lexur.mapper.SongMapper;
import cc.lexur.pojo.Collect;
import cc.lexur.pojo.CollectExample;
import cc.lexur.pojo.Song;
import cc.lexur.services.CollectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.security.auth.login.CredentialException;
import javax.sound.midi.Soundbank;
import java.util.List;

/**
 * @Auther: lexur
 * @Date: 2021/8/27
 * @Description: cc.lexur.services.impl
 * @version: 1.0
 */
@Service
public class CollectServiceImpl implements CollectService {

    @Autowired
    CollectMapper collectMapper;

    @Autowired
    SongMapper songMapper;

    @Override
    public boolean add(int userId, int songId) {
        // 检查是否添加过
        CollectExample example = new CollectExample();
        CollectExample.Criteria criteria = example.createCriteria();
        criteria.andSongIdEqualTo(songId);
        criteria.andUserIdEqualTo(userId);
        List<Collect> collects = collectMapper.selectByExample(example);
        if (!collects.isEmpty()){
            System.out.println("收藏已存在");
            return false;
        }

        // 添加收藏量
        Song song = songMapper.selectByPrimaryKey(songId);
        if (song == null){
            System.out.println("音乐不存在");
            return false;
        }
        song.setCollection(song.getCollection()+1);
        System.out.println(song.getId()+":收藏量增加");
        songMapper.updateByPrimaryKey(song);

        // 添加收藏
        Collect collect = new Collect();
        collect.setUserId(userId);
        collect.setSongId(songId);
        int i = collectMapper.insert(collect);
        System.out.println("添加收藏,结果:"+i);
        return true;
    }

    @Override
    public boolean delete(int userId, int songId) {
        CollectExample example = new CollectExample();
        CollectExample.Criteria criteria = example.createCriteria();
        criteria.andUserIdEqualTo(userId);
        criteria.andSongIdEqualTo(songId);
        int i = collectMapper.deleteByExample(example);
        if (i == 0){
            System.out.println("收藏不存在");
            return false;
        }
        System.out.println("取消收藏，结果："+i);
        return true;
    }

    @Override
    public List<Song> show(int userId) {
        
        return null;
    }

    @Override
    public boolean check(int userId, int songId) {
        CollectExample example = new CollectExample();
        CollectExample.Criteria criteria = example.createCriteria();
        criteria.andUserIdEqualTo(userId);
        criteria.andSongIdEqualTo(songId);
        List<Collect> collects = collectMapper.selectByExample(example);
        System.out.println("userId:"+userId+"  songId:"+songId);
        System.out.println(collects);
        if (collects.isEmpty()){
            System.out.println("未收藏");
            return false;
        }
        System.out.println("已收藏");
        return true;
    }
}
