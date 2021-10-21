package com.blog.server.controller;

import com.blog.server.auth.AuthRequest;
import com.blog.server.auth.AuthResponse;
import com.blog.server.config.CustomUserDetails;
import com.blog.server.dto.UserRequestDTO;
import com.blog.server.dto.UserResponseDTO;
import com.blog.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = {"http://localhost:3000/", "http://localhost:8080/"})
public class AuthAndRegisterController {

    private final UserService userService;

    @Autowired
    public AuthAndRegisterController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerUser(@Valid @RequestBody UserRequestDTO userRequestDTO) {
        return new ResponseEntity<>(userService.createUser(userRequestDTO), HttpStatus.CREATED);
    }

    @PostMapping("/auth")
    public ResponseEntity<UserResponseDTO> auth(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return new ResponseEntity<>(userService.getUserData(customUserDetails), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> checkLoginData(@Valid @RequestBody AuthRequest authRequest) {
        return new ResponseEntity<>(userService.checkLoginAndPassword(authRequest), HttpStatus.OK);
    }
}
