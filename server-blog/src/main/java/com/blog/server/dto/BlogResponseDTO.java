package com.blog.server.dto;

import com.blog.server.entity.Blog;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class BlogResponseDTO {
    private Long id;
    private String title;
    private String text;
    private byte[] image;
    private int likeCount;
    private Set<String> likeUser = new HashSet<>();
    @JsonFormat(pattern = "HH:mm:ss dd.MM.yyyy")
    private Date date;

    public BlogResponseDTO(Blog blog, ImageResponseDao imageResponseDAO) {
        this.id = blog.getId();
        this.title = blog.getTitle();
        this.text = blog.getText();
        this.image = imageResponseDAO.getFile();
        this.likeCount = blog.getCountLikes();
        this.likeUser = blog.getLikeUsers();
        this.date = blog.getDate();
    }

}
