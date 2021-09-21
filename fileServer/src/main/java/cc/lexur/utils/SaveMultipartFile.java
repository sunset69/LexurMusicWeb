package cc.lexur.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigInteger;
import java.security.MessageDigest;
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
    //public static String save(MultipartFile multipartFile, String path) throws IOException {
    //    // 上传文件
    //    multipartFile.transferTo(new File(path));
    //    return filename;
    //}

    /**
     * 获取文件类型
     * @param filename
     * @return
     */
    public static String getFileType(String filename){
        String delimeter = "\\.";  // 指定分割字符
        String[] split = filename.split(delimeter);
        System.out.println(split.length);
        if (split.length <= 1){
            return null;
        }else {
            return split[split.length-1];
        }
    }

    /**
     * 获取上传文件的md5
     * @param file
     * @return
     * @throws IOException
     */
    public static String getMd5(MultipartFile file) {
        try {
            //获取文件的byte信息
            byte[] uploadBytes = file.getBytes();
            // 拿到一个MD5转换器
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            byte[] digest = md5.digest(uploadBytes);
            //转换为16进制
            return new BigInteger(1, digest).toString(16);
        } catch (Exception e) {
            //log.error(e.getMessage());
            System.out.println(e.getMessage());
        }
        return null;
    }

    /**
     * 获取UUID
     * @return
     */
    public static String getUuid(){
        String uuid = UUID.randomUUID().toString().replace("-", "");
        return uuid;
    }

}
