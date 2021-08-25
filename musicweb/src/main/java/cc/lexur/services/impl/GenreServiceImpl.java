package cc.lexur.services.impl;

import cc.lexur.mapper.GenreMapper;
import cc.lexur.pojo.Genre;
import cc.lexur.pojo.GenreExample;
import cc.lexur.pojo.User;
import cc.lexur.services.GenreService;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Auther: lexur
 * @Date: 2021/8/24
 * @Description: cc.lexur.services.impl
 * @version: 1.0
 */
@Service
public class GenreServiceImpl implements GenreService {

    @Autowired
    GenreMapper genreMapper;

    @Override
    public List<Genre> getGenre(int pn, int size) {
        //进行分页查询
        PageHelper.startPage(pn, size);
        List<Genre> list = genreMapper.selectByExample(null);
        return list;
    }

    @Override
    public boolean addGenre(Genre genre) {
        genre.setId(null);
        GenreExample example = new GenreExample();
        GenreExample.Criteria criteria = example.createCriteria();
        criteria.andNameEqualTo(genre.getName());
        List<Genre> list = genreMapper.selectByExample(example);
        if (!list.isEmpty()){
            System.out.println(genre.getName()+"已存在");
            return false;
        }
        genreMapper.insert(genre);
        System.out.println(genre.getName()+"插入成功");
        return true;
    }

    @Override
    public boolean deleteGenre(int id) {
        Genre genre = genreMapper.selectByPrimaryKey(id);
        if (genre == null){
            return false;
        }
        genreMapper.deleteByPrimaryKey(id);
        return true;
    }

    @Override
    public boolean updateGenre(Genre genre) {
        if (genre.getId() == null){
            return false;
        }
        Genre genre1 = genreMapper.selectByPrimaryKey(genre.getId());
        if (genre1 == null){
            return false;
        }
        genreMapper.updateByPrimaryKeySelective(genre);
        return true;
    }
}
