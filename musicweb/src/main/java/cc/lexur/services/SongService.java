package cc.lexur.services;

import cc.lexur.pojo.Song;

import java.util.List;

/**
 * @Auther: lexur
 * @Date: 2021/8/23
 * @Description: cc.lexur.services
 * @version: 1.0
 */
public interface SongService {

    // 获取有效音乐信息
    public List<Song> getSongList(int pn, int size);

    // 获取所有音乐信息
    public List<Song> getAllSongList(int pn, int size);

    // 添加音乐
    public boolean addSong(Song song);

    // 更具id删除音乐
    public boolean deleteSong(int id);

    // 修改音乐
    public boolean updateSong(Song song);

    // 检查id是否存在
    public boolean checkId(int id);

    // 通过歌名搜索
    public List<Song> searchByTitle(String name);

    // 通过分类搜索
    public List<Song> searchByGenre(String name);

    // 搜索
    public List<Song> search(String title,int genreId,String author,int pn,int size);

}
