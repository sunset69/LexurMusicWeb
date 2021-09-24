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

    // 获取分类信息
    public List<Genre> getGenre(int pn, int size);

    // 添加分类
    public boolean addGenre(Genre genre);

    // 删除分类
    public boolean deleteGenre(int id);

    // 修改分类
    public boolean updateGenre(Genre genre);

    // 检查id是否存在
    public boolean checkId(int id);

    // 通过id获取分类
    Genre getGenreById(int id);
}
