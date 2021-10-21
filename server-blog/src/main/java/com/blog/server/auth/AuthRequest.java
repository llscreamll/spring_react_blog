package com.blog.server.auth;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class AuthRequest {
    @NotEmpty(message = "не должен быть пустым")
    @Size(min = 3,max = 20,message = "должен состоять из 3-20 символов")
    private String login;
    @NotEmpty(message = "не должен быть пустым")
    @Size(min = 3,max = 20,message = "должен состоять из 3-20 символов")
    private String password;
    public AuthRequest() {
    }
    public AuthRequest(String login, String password) {
        this.login = login;
        this.password = password;
    }
    public String getLogin() {
        return login;
    }
    public String getPassword() {
        return password;
    }
}
