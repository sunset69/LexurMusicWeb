package cc.lexur.services;

import cc.lexur.pojo.Fileinfo;
import org.springframework.web.multipart.MultipartFile;

/**
 * @Auther: lexur
 * @Date: 2021/9/20
 * @Description: cc.lexur.services
 * @version: 1.0
 */
public interface FileService {
    public Fileinfo saveFile(MultipartFile multipartFile, String path, String url);

    public Fileinfo checkRepeat(MultipartFile multipartFile);

    public Fileinfo getFileInfoByMD5(String md5);
}
