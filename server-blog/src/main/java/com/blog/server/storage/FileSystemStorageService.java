package com.blog.server.storage;

import com.blog.server.dto.ImageResponseDao;
import com.blog.server.exception.NotFoundException;
import com.blog.server.exception.PictureFormatIsNotCorrectException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class FileSystemStorageService implements StorageService{
    @Value("${upload.path}")
    private String uploadPath;

    Logger logger = LoggerFactory.getLogger(FileSystemStorageService.class);


    @Override
    public ImageResponseDao imagePresent(MultipartFile file) {
        if (checkFormatAndType(file.getContentType(), file.getOriginalFilename())) {
            try {
                return new ImageResponseDao(file.getOriginalFilename(), file.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        throw new PictureFormatIsNotCorrectException();
    }

    @Override
    public String saveImage(MultipartFile file) {
        if (!checkFormatAndType(file.getContentType(), file.getOriginalFilename())) {
            logger.error("Error saveImage");
            throw new NotFoundException();
        }
        Path path = Paths.get(uploadPath).toAbsolutePath();
        String uuidFile = UUID.randomUUID().toString();
        String resultFileName = uuidFile + "." + file.getOriginalFilename();
        try {
            file.transferTo(new File(path + "\\" + resultFileName));
            return resultFileName;
        } catch (IOException e) {
          e.printStackTrace();
        }
        return resultFileName;
    }

    @Override
    public ImageResponseDao loadImage(String name) {
        String s = Paths.get(uploadPath).toAbsolutePath() + "\\" + name;
        try {
            return new ImageResponseDao(name, Files.readAllBytes(Paths.get(s)));
        } catch (IOException e) {
            logger.error("read byte image");
            throw new PictureFormatIsNotCorrectException();
        }
    }

    public boolean checkFormatAndType(String type, String originalName) {
        if (type.equals("image/png") &&
                originalName.endsWith(".png") ||
                originalName.endsWith(".jpg") ||
                originalName.endsWith(".gif")) {
            return true;
        }
        logger.error("Error format or type");
        return false;
    }
}
