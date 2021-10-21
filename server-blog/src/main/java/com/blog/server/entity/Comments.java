package com.blog.server.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "comments")
public class Comments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text",nullable = false,columnDefinition = "text")
    private String text;

    @Column(name = "user_id",nullable = false)
    private Long userId;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "blog_id")
    private Blog blog;

    @CreationTimestamp
    private Date date;

    public Comments(String text, Long userId, Blog blog) {
        this.text = text;
        this.userId = userId;
        this.blog = blog;
    }
}
