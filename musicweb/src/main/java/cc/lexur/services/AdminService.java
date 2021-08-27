package cc.lexur.services;

import org.springframework.stereotype.Service;

/**
 * @Auther: lexur
 * @Date: 2021/8/23
 * @Description: cc.lexur.services
 * @version: 1.0
 */
public interface AdminService {

    public boolean login(String username, String password);

    public boolean checkId(int id);
}
