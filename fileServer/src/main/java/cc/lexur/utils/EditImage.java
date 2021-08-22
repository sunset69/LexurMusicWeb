package cc.lexur.utils;

import java.awt.image.BufferedImage;

/**
 * @Auther: lexur
 * @Date: 2021/8/22
 * @Description: cc.lexur.utils
 * @version: 1.0
 */
public class EditImage {

    /**
     * 将图片裁剪成正方形
     * @param bi
     * @return
     */
    public static BufferedImage getSque(BufferedImage bi) {
        int init_width = bi.getWidth();
        int init_height = bi.getHeight();
        if (init_width != init_height){
            int width_height = 0;
            int x = 0;
            int y = 0;
            if (init_width > init_height) {
                width_height = init_height;//原图是宽大于高的长方形
                x = (init_width-init_height)/2;
                y = 0;
            } else if (init_width < init_height) {
                width_height = init_width;//原图是高大于宽的长方形
                y = (init_height-init_width)/2;
                x = 0;
            }
            bi = bi.getSubimage(x, y, width_height, width_height);
        }
        return bi;
    }
}
