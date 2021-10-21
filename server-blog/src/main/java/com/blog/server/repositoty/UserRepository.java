package com.blog.server.repositoty;

import com.blog.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @Transactional
    @Modifying
    @Query(value = "UPDATE users SET status = :status WHERE login = :login",nativeQuery = true)
    void updateStatus (String status, String login);


    @Query(value = "SELECT * FROM users WHERE login = :login",nativeQuery = true)
    Optional<User> findByLogin(String login);

    Optional<User> findById(Long id);
    boolean  existsByLoginOrEmail(String login,String email);
}
