package cc.lexur.controller;

import cc.lexur.pojo.Fileinfo;
import cc.lexur.pojo.Msg;
import cc.lexur.services.FileService;
import cc.lexur.utils.SaveMultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
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
@CrossOrigin(allowCredentials = "true") //允许跨域请求
public class UploadController {

    @Autowired
    FileService fileService;

    @RequestMapping(value = "/upload",method = RequestMethod.POST)
    //@CrossOrigin(origins = "192.168.0.1") //只允许指定ip跨域
    @ResponseBody
    public Msg upload(@RequestParam MultipartFile file, HttpServletRequest request) throws IOException{
        String path = request.getSession().getServletContext().getRealPath("/uploads/");
        String APP_PATH = request.getContextPath();
        //检测文件夹是否存在，若不存在则创建文件夹
        File uploadPath = new File(path);
        if (!uploadPath.exists()) {
            //创建文件夹
            uploadPath.mkdirs();
        }

        String scheme = request.getScheme();
        String serverName = request.getServerName();
        int serverPort = request.getServerPort();
        String contextPath = request.getContextPath();//项目名
        String url = scheme+"://"+serverName+":"+serverPort+contextPath+"/uploads/";
        //System.out.println("url:"+url);

        Fileinfo fileinfo = fileService.checkRepeat(file);
        if (fileinfo == null){
            fileinfo = fileService.saveFile(file,path,url);
            if (fileinfo == null){
                return Msg.fail();
            }
        }
        return Msg.success().add("fileInfo",fileinfo);
    }

    ///**
    // * 保存上传文件并返回链接
    // * @param file
    // * @param request
    // * @return
    // * @throws IOException
    // */
    //@RequestMapping(value = "/upload",method = RequestMethod.POST)
    ////@CrossOrigin(origins = "192.168.0.1") //只允许指定ip跨域
    //@ResponseBody
    //public Msg upload(@RequestParam MultipartFile file, HttpServletRequest request) throws IOException {
    //    // 1. 检测上传文件夹
    //    String path = request.getSession().getServletContext().getRealPath("/uploads/");
    //    String APP_PATH = request.getContextPath();
    //    File uploadPath = new File(path);
    //    if (!uploadPath.exists()) {
    //        //创建文件夹
    //        uploadPath.mkdirs();
    //    }
    //    //// 2.保存上传文件
    //    //String fileName=null;
    //    //if (!file.isEmpty()){
    //    //    fileName = SaveMultipartFile.save(file,path);
    //    //}else {
    //    //    return Msg.fail();
    //    //}
    //    //System.out.println(fileName);
    //    //String scheme = request.getScheme();
    //    //String fileUrl = "weburl"+fileName;
    //    //String serverName = request.getServerName();
    //    //int serverPort = request.getServerPort();
    //    //String contextPath = request.getContextPath();//项目名
    //    //String url = scheme+"://"+serverName+":"+serverPort+contextPath+"/uploads/"+fileName;
    //    //
    //    //Msg msg = new Msg();
    //    //msg = Msg.success();
    //    //msg.add("fileName",fileName).add("url",url);
    //    //
    //    //return msg;
    //    if (file.isEmpty()){
    //        return Msg.fail();
    //    }
    //    fileService.saveFile(file,path);
    //    return Msg.success();
    //}
}
