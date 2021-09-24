package cc.lexur.services;

import org.springframework.stereotype.Service;

/**
 * @Auther: lexur
 * @Date: 2021/8/23
 * @Description: cc.lexur.services
 * @version: 1.0
 */
public interface AdminService {

    // 登录
    public boolean login(String username, String password);

    // 检查管理员id是存在
    public boolean checkId(int id);
}
