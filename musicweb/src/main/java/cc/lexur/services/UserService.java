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
}
