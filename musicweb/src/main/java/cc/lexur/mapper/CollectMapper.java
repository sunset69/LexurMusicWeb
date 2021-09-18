package cc.lexur.mapper;

import cc.lexur.pojo.Collect;
import cc.lexur.pojo.CollectExample;
import java.util.List;

import cc.lexur.pojo.Song;
import org.apache.ibatis.annotations.Param;

public interface CollectMapper {

    List<Song> getCollectedSong(int userId);

    long countByExample(CollectExample example);

    int deleteByExample(CollectExample example);

    int deleteByPrimaryKey(Long id);

    int insert(Collect record);

    int insertSelective(Collect record);

    List<Collect> selectByExample(CollectExample example);

    Collect selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") Collect record, @Param("example") CollectExample example);

    int updateByExample(@Param("record") Collect record, @Param("example") CollectExample example);

    int updateByPrimaryKeySelective(Collect record);

    int updateByPrimaryKey(Collect record);
}