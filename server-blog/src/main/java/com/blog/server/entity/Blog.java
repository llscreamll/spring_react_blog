package com.blog.server.entity;

import lombok.*;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "blog")
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "text", columnDefinition = "text", nullable = false)
    private String text;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "image_name")
    private String imageName;

    @Column(name = "count_like")
    private int countLikes;

    @Column(name = "comments_id")
    @OneToMany(mappedBy = "blog", fetch = FetchType.LAZY,orphanRemoval = true)
    private List<Comments> comments;

    @Column(name = "like_user")
    @ElementCollection(targetClass = String.class, fetch = FetchType.LAZY)
    private Set<String> likeUsers = new HashSet<>();

    @CreationTimestamp
    private Date date;

    public Blog(String title, String text, User user, String imageName) {
        this.title = title;
        this.text = text;
        this.user = user;
        this.imageName = imageName;
    }
}