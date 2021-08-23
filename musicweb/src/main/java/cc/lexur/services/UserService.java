package cc.lexur.services;

import cc.lexur.pojo.User;

import java.util.List;

/**
 * @Auther: lexur
 * @Date: 2021/8/23
 * @Description: cc.lexur.services
 * @version: 1.0
 */
public interface UserService {

    public boolean login(String mail, String password);

    public List<User> getUserList(int pn,int size);

    public boolean addUser(User user);//添加 id不需要

    public boolean deleteUser(int id);//删除 id必须

    public boolean updateUser(User user);//修改 id必须
}
