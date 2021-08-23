package cc.lexur.services.impl;

import cc.lexur.mapper.UserMapper;
import cc.lexur.pojo.User;
import cc.lexur.pojo.UserExample;
import cc.lexur.services.UserService;
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
        List<User> list = userMapper.selectByExample(null);
        return list;
    }
}
