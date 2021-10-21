package com.blog.server.auth;

import com.blog.server.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {
    private Long id;
    private String name;
    private String login;
    private String email;
    private String token;
    private String status;

    public AuthResponse(Long id, String name, String login, String email, String status, String token) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.email = email;
        this.token = token;
        this.status = status;
    }
    public AuthResponse(User user,String token) {
        this.id = user.getId();
        this.name = user.getName();
        this.login = user.getLogin();
        this.email = user.getEmail();
        this.status = user.getStatus();
        this.token = token;
    }
}
