package cc.lexur.services;

import cc.lexur.pojo.Collect;

import java.util.List;

/**
 * @Auther: lexur
 * @Date: 2021/8/27
 * @Description: cc.lexur.services
 * @version: 1.0
 */
public interface CollectService {

    public boolean add(int userId,int songId);

    public boolean delete(int userId,int songId);

    public List<Collect> getCollectPage(int userId);

    public boolean check(int userId,int songId);

}
