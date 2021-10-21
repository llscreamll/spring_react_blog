package com.blog.server.storage;

import com.blog.server.dto.ImageResponseDao;
import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    ImageResponseDao loadImage(String name);
    String saveImage (MultipartFile file);
    ImageResponseDao imagePresent (MultipartFile file);
}
