package com.blog.server.service;

import com.blog.server.dto.CommentRequestDto;
import com.blog.server.entity.Comments;
import com.blog.server.exception.BlogNotFoundException;
import com.blog.server.exception.NotFoundException;
import com.blog.server.repositoty.BlogRepository;
import com.blog.server.repositoty.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final BlogRepository blogRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, BlogRepository blogRepository) {
        this.commentRepository = commentRepository;
        this.blogRepository = blogRepository;
    }


    public void saveComment(CommentRequestDto commentRequestDto) {
        Comments comments = new Comments();
        comments.setBlog(blogRepository.findById(commentRequestDto.getBlogId()).orElseThrow(BlogNotFoundException::new));
        comments.setUserId(commentRequestDto.getUserId());
        comments.setText(commentRequestDto.getText());
        commentRepository.save(comments);
    }


}
