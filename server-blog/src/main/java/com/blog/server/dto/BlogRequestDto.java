package com.blog.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BlogRequestDto {
    @NotEmpty(message = "добавьте описание")
    private String title;
    @NotEmpty(message = "добавьте текс")
    private String text;
    private MultipartFile file;
}
