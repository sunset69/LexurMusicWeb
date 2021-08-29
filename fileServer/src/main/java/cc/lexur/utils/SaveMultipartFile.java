package cc.lexur.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

/**
 * @Auther: lexur
 * @Date: 2021/8/22
 * @Description: cc.lexur.utils
 * @version: 1.0
 */
public class SaveMultipartFile {

    /**
     * 保存上传文件
     * @param multipartFile 上传文件
     * @param path 保存路径
     * @return 保存的文件名
     * @throws IOException
     */
    public static String save(MultipartFile multipartFile, String path) throws IOException {
        // 保存文件
        String filename = multipartFile.getOriginalFilename();
        // 去除一些非法字符
        filename = filename.replace(" ","")
                           .replace("&","");
        //System.out.println(filename);
        // 把文件名设置成唯一值，uuid
        String uuid = UUID.randomUUID().toString().replace("-", "");
        filename = uuid + "_" + filename;
        System.out.println("上传文件：" + filename);
        // 上传文件
        multipartFile.transferTo(new File(path, filename));
        //return path+filename;
        return filename;
    }
}
