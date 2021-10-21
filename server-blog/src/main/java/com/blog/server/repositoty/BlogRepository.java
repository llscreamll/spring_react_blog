package com.blog.server.repositoty;

import com.blog.server.entity.Blog;
import com.blog.server.entity.User;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.Nullable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {

    @Query(value = "SELECT * FROM blog WHERE id = :id",nativeQuery = true)
    Optional<Blog> findById(Long id);

    boolean existsByIdAndUserId(Long blogId, Long userId);

    void deleteBlogById(Long id);

    @Query(value = "select * from blog where user_id = ?id",nativeQuery = true)
    List<Blog> findAllByUserId(Long id);

    List<Blog> findAllByUserLoginOrderByIdDesc(String id);

    @Query(value = "SELECT count(*) from blog", nativeQuery = true)
    Long findMaxCount();

}
