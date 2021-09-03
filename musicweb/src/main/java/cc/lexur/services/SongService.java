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

    public List<Song> getSongList(int pn, int size);

    public List<Song> getAllSongList(int pn, int size);

    public boolean addSong(Song song);

    public boolean deleteSong(int id);

    public boolean updateSong(Song song);

    public boolean checkId(int id);

    public List<Song> searchByTitle(String name);

    public List<Song> searchByGenre(String name);

    public List<Song> search(String title,int genreId,String author,int pn,int size);

}
