package com.blog.server.util;

import com.blog.server.exception.NotFoundException;
import org.imgscalr.Scalr;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ImageUtils {
    // convert BufferedImage to byte[]
    private static byte[] toByteArray(BufferedImage bi, String format)
            throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bi, format, baos);
        byte[] bytes = baos.toByteArray();
        return bytes;
    }

    // convert byte[] to BufferedImage
    private static BufferedImage toBufferedImage(byte[] bytes)
            throws IOException {
        InputStream is = new ByteArrayInputStream(bytes);
        BufferedImage bi = ImageIO.read(is);
        return bi;
    }
    // get format
    private static String getFormat(String name) {
        String format = null;
        if (name != null) {
            Pattern pattern = Pattern.compile("(\\w+)$");
            Matcher matcher = pattern.matcher(name);
            while (matcher.find()) {
                format = matcher.group();
            }
        }
        return format;

    }
    // convert from MultipartFile to byte[]
    public static byte[] converterAssistant(MultipartFile file) {
        String imageName = file.getOriginalFilename();
        byte[] imageByte;
        if (Objects.equals(file.getContentType(), "image/png")
                && Objects.requireNonNull(imageName).endsWith("png")
                || Objects.requireNonNull(imageName).endsWith("jpg") || Objects.requireNonNull(imageName).endsWith("gif")) {
            try {
                int IMAGE_SIZE = 1000;
                BufferedImage oldImg = Scalr.resize(ImageIO.read(file.getInputStream()), IMAGE_SIZE);
                imageByte = toByteArray(oldImg, getFormat(imageName));

            } catch (IOException e) {
                throw new NotFoundException();
            }
            return imageByte;
        }
        throw new NotFoundException();
    }
}