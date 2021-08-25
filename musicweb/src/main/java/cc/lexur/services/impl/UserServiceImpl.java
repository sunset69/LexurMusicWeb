package cc.lexur.services.impl;

import cc.lexur.mapper.UserMapper;
import cc.lexur.pojo.User;
import cc.lexur.pojo.UserExample;
import cc.lexur.services.UserService;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Auther: lexur
 * @Date: 2021/8/23
 * @Description: cc.lexur.services.impl
 * @version: 1.0
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserMapper userMapper;

    /**
     * 用户登录
     * @param mail
     * @param password
     * @return
     */
    @Override
    public boolean login(String mail, String password) {
        UserExample example = new UserExample();
        UserExample.Criteria criteria = example.createCriteria();
        criteria.andMailEqualTo(mail);
        criteria.andPasswordEqualTo(password);
        criteria.andLockedEqualTo("N");
        List<User> admins = userMapper.selectByExample(example);
        if (admins.isEmpty()){
            System.out.println(mail +"登录失败！");
            return false;
        }
        System.out.println(mail +"登录成功！");
        return true;
    }

    /**
     * 获取用户数据
     * @param pn
     * @param size
     * @return
     */
    @Override
    public List<User> getUserList(int pn, int size) {
        //进行分页查询
        PageHelper.startPage(pn, size);
        List<User> list = userMapper.selectByExample(null);
        return list;
    }

    @Override
    public User selectById(int id) {
        User user = userMapper.selectByPrimaryKey(id);
        return user;
    }

    @Override
    public List<User> selectByMail(String mail) {
        UserExample example = new UserExample();
        UserExample.Criteria criteria = example.createCriteria();
        criteria.andMailEqualTo(mail);
        List<User> userList = userMapper.selectByExample(example);
        return userList;
    }

    @Override
    public boolean addUser(User user) {
        //UserExample example = new UserExample();
        //UserExample.Criteria criteria = example.createCriteria();
        //criteria.andMailEqualTo(user.getMail());
        //if (!userMapper.selectByExample(example).isEmpty()){
        //    System.out.println(user.getMail()+"已存在，插入失败!");
        //    return false;
        //}
        userMapper.insert(user);
        System.out.println(user.getMail()+"插入成功!");
        return true;
    }

    @Override
    public boolean deleteUser(int id) {
        User user = userMapper.selectByPrimaryKey(id);
        if (user == null){
            return false;
        }
        //userMapper.deleteByPrimaryKey(id);
        //User record = new User();
        //record.setId(id);
        //record.setLocked("Y");
        user.setLocked("Y");
        userMapper.updateByPrimaryKey(user);
        return true;
    }

    @Override
    public boolean updateUser(User record) {
        if (record.getId() == null || record.getId() < 0){
            return false;
        }
        User user = userMapper.selectByPrimaryKey(record.getId());
        if (user == null){
            return false;
        }
        int i = userMapper.updateByPrimaryKeySelective(record);
        System.out.println("update result:"+i);
        return true;
    }

}
