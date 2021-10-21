package com.blog.server.controller;

import com.blog.server.dto.BlogResponseDTO;
import com.blog.server.dto.ImageResponseDao;
import com.blog.server.dto.UserResponseDTO;
import com.blog.server.entity.User;
import com.blog.server.mapper.UserMapper;
import com.blog.server.service.BlogService;
import com.blog.server.service.UserService;
import com.blog.server.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000/","http://localhost:8080/"})
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
   private  final  StorageService storageService;
    private final BlogService blogService;
    @Autowired
    public UserController(UserService userService, StorageService storageService, BlogService blogService) {
        this.userService = userService;
        this.storageService = storageService;

        this.blogService = blogService;
    }


    @PutMapping("/status/{text}")
    public ResponseEntity<?> updateUserStatus(@PathVariable("text") String status, Principal principal) {
        userService.setStatus(status, principal.getName());
        return ResponseEntity.ok().build();
    }
    @PostMapping("/img")
    public ResponseEntity<ImageResponseDao> giveImage(@RequestParam("file") MultipartFile file){
        return new ResponseEntity<>(storageService.imagePresent(file), HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> allUsers = userService.getAllUsers();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }
    @GetMapping("/{userId}")
    public ResponseEntity<HashMap<String,Object>> getUserById(@PathVariable(name = "userId") Long id) {
        HashMap<String,Object> result = new HashMap<>();
        User userById = userService.findUserById(id);
        List<BlogResponseDTO> allByUserName = blogService.findAllByUserName(userById.getName());
        result.put("user", UserMapper.fromUserToUserResponseDTO(userById));
        result.put("blog",allByUserName);
        return ResponseEntity.ok(result);
    }
}
