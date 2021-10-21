package com.blog.server.mapper;

import com.blog.server.dto.BlogResponseDTO;
import com.blog.server.dto.ImageResponseDao;
import com.blog.server.entity.Blog;


public class BlogMapper {
    public static BlogResponseDTO fromBlogToBlogResponseDTO(Blog blog, ImageResponseDao imageResponseDAO) {
        return new BlogResponseDTO(blog,imageResponseDAO);
    }

}
