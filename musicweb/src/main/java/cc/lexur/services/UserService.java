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

    // 登录
    public boolean login(String mail, String password);

    // 获取用户信息
    public List<User> getUserList(int pn, int size);

    // 通过id查找用户
    public User selectById(int id);

    // 通过mail获取用户
    public List<User> selectByMail(String mail);

    //添加 id不需要
    public boolean addUser(User user);

    //删除 id必须
    public boolean deleteUser(int id);

    // 修改 id必须
    public boolean updateUser(User user);

    // 检查用户id是否存在
    public boolean checkId(int id);

    // 检查邮箱是否可用
    public boolean checkMail(String mail);

}
