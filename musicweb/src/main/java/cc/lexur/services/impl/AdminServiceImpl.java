package cc.lexur.services.impl;

import cc.lexur.mapper.AdminMapper;
import cc.lexur.pojo.Admin;
import cc.lexur.pojo.AdminExample;
import cc.lexur.services.AdminService;
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
public class AdminServiceImpl implements AdminService {

    @Autowired
    AdminMapper adminMapper;

    /**
     * 管理员登录
     * @param username
     * @param password
     * @return
     */
    @Override
    public boolean login(String username, String password) {
        AdminExample example = new AdminExample();
        AdminExample.Criteria criteria = example.createCriteria();
        criteria.andUsernameEqualTo(username);
        criteria.andPasswordEqualTo(password);
        List<Admin> admins = adminMapper.selectByExample(example);
        System.out.println(admins.toString());
        if (admins.isEmpty()){
            System.out.println(username+"登录失败！");
            return false;
        }
        System.out.println(username+"登录成功！");
        return true;
    }
}
