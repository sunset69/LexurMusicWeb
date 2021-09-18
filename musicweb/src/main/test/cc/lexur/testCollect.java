package cc.lexur;

import cc.lexur.services.CollectService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @Auther: lexur
 * @Date: 2021/9/15
 * @Description: cc.lexur
 * @version: 1.0
 */
public class testCollect {
    ApplicationContext ctx = null;
    CollectService collectService = null;

    @Before
    public void init(){
        ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        collectService = (CollectService) ctx.getBean("collectServiceImpl");
    }

    @Test
    public void getCollectedSong(){
        collectService.getCollectedSong(1,1,8);
    }
}
