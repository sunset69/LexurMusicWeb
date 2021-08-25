package cc.lexur.services;

import cc.lexur.pojo.Genre;

import java.util.List;

/**
 * @Auther: lexur
 * @Date: 2021/8/24
 * @Description: cc.lexur.services
 * @version: 1.0
 */
public interface GenreService {

    public List<Genre> getGenre(int pn, int size);

    public boolean addGenre(Genre genre);

    public boolean deleteGenre(Genre genre);

    public boolean updateGenre(Genre genre);

}
