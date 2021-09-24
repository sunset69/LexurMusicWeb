package cc.lexur.services;

import cc.lexur.pojo.Collect;
import cc.lexur.pojo.Song;

import java.util.List;

/**
 * @Auther: lexur
 * @Date: 2021/8/27
 * @Description: cc.lexur.services
 * @version: 1.0
 */
public interface CollectService {

    // 获取收藏列表,并返回音乐信息
    public List<Song> getCollectedSong(int userId,int pn,int size);

    //获取分类信息
    public List<Collect> getCollectPage(int userId);

    // 添加收藏
    public boolean add(int userId,int songId);

    // 删除分类
    public boolean delete(int userId,int songId);

    // 检查收藏
    public boolean check(int userId,int songId);

}
