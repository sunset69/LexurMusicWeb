package cc.lexur.services.impl;

import cc.lexur.mapper.FileinfoMapper;
import cc.lexur.pojo.Fileinfo;
import cc.lexur.pojo.FileinfoExample;
import cc.lexur.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import static cc.lexur.utils.SaveMultipartFile.*;

/**
 * @Auther: lexur
 * @Date: 2021/9/20
 * @Description: cc.lexur.services.impl
 * @version: 1.0
 */
@Service
public class FileServiceImpl implements FileService {

    @Autowired
    FileinfoMapper fileinfoMapper;

    @Override
    public Fileinfo saveFile(MultipartFile multipartFile, String path, String url) {
        Fileinfo file = new Fileinfo();
        // 获取文件名
        String filename = multipartFile.getOriginalFilename();
        file.setName(filename);
        // 文件类型
        String fileType = getFileType(filename);
        file.setType(fileType);

        // 获取MD5
        String md5 = getMd5(multipartFile);
        file.setMd5(md5);

        // UUID
        String uuid = getUuid();
        file.setUuid(uuid);

        // 保存路径
        String savePath = path + uuid + "." + fileType;
        System.out.println(savePath);
        file.setPath("/uploads/");



        // 创建日期
        file.setCreatetime(new Date());
        double size =  multipartFile.getSize()/1024;
        file.setSize(size);

        // url
        url = url + uuid + "." + fileType;
        file.setUrl(url);

        try {
            multipartFile.transferTo(new File(savePath));
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            return null;
        }
        System.out.println(file);
        fileinfoMapper.insert(file);
        Fileinfo fileinfo = getFileInfoByMD5(md5);
        return fileinfo;
    }

    @Override
    public Fileinfo checkRepeat(MultipartFile multipartFile) {
        String md5 = getMd5(multipartFile);
        Fileinfo fileinfo = getFileInfoByMD5(md5);
        if (fileinfo == null){
            System.out.println("文件不存在");
            return null;
        }
        System.out.println("文件已存在！");
        return fileinfo;
    }

    @Override
    public Fileinfo getFileInfoByMD5(String md5) {
        FileinfoExample example = new FileinfoExample();
        FileinfoExample.Criteria criteria = example.createCriteria();
        criteria.andMd5EqualTo(md5);
        List<Fileinfo> list = fileinfoMapper.selectByExample(example);
        if (list.isEmpty()){
            return null;
        }
        return list.get(0);
    }

}
