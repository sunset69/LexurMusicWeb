package cc.lexur.controller;

import cc.lexur.pojo.Msg;
import cc.lexur.utils.SaveMultipartFile;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

/**上传控制器
 * @Auther: lexur
 * @Date: 2021/8/22
 * @Description: cc.lexur.controller
 * @version: 1.0
 */
@Controller
public class UploadController {

    /**
     * 保存上传文件并返回链接
     * @param file
     * @param request
     * @return
     * @throws IOException
     */
    @RequestMapping(value = "/upload",method = RequestMethod.POST)
    @ResponseBody
    public Msg upload(@RequestParam MultipartFile file, HttpServletRequest request) throws IOException {
        // 1. 检测上传文件夹
        String path = request.getSession().getServletContext().getRealPath("/uploads/");
        String APP_PATH = request.getContextPath();
        //System.out.println("APP_PATH:"+APP_PATH);
        //System.out.println("upload path:"+path);
        File uploadPath = new File(path);
        if (!uploadPath.exists()) {
            //创建文件夹
            uploadPath.mkdirs();
        }
        // 2.保存上传文件
        String fileName=null;
        if (!file.isEmpty()){
            fileName = SaveMultipartFile.save(file,path);
        }else {
            return Msg.fail();
        }
        System.out.println(fileName);
        String scheme = request.getScheme();
        String fileUrl = "weburl"+fileName;
        String serverName = request.getServerName();
        int serverPort = request.getServerPort();
        String contextPath = request.getContextPath();//项目名
        String url = scheme+"://"+serverName+":"+serverPort+contextPath+"/uploads/"+fileName;

        Msg msg = new Msg();
        msg = Msg.success();
        msg.add("fileName",fileName).add("url",url);

        //System.out.println(msg.toString());
        return msg;
    }
}
