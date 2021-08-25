package cc.lexur.mapper;

import cc.lexur.pojo.Genre;
import cc.lexur.pojo.GenreExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface GenreMapper {
    long countByExample(GenreExample example);

    int deleteByExample(GenreExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Genre record);

    int insertSelective(Genre record);

    List<Genre> selectByExample(GenreExample example);

    Genre selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Genre record, @Param("example") GenreExample example);

    int updateByExample(@Param("record") Genre record, @Param("example") GenreExample example);

    int updateByPrimaryKeySelective(Genre record);

    int updateByPrimaryKey(Genre record);
}