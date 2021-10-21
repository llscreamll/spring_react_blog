package com.blog.server.controller;

import com.blog.server.dto.BlogResponseDTO;
import com.blog.server.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000/", "http://localhost:8080/"})
@RequestMapping("/blog")
public class BlogController {
    private final BlogService blogService;

    @Autowired
    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping(value = "/")
    public ResponseEntity<HashMap<String, Object>> findAllBlog() {
        return new ResponseEntity<>(blogService.findAllLimitTen(0), HttpStatus.OK);
    }

    @GetMapping(value = "/{page}")
    public ResponseEntity<HashMap<String, Object>> getLimitBlog(@PathVariable(value = "page",required = false) Integer page) {
        return new ResponseEntity<>(blogService.findAllLimitTen(page), HttpStatus.OK);
    }
    @PostMapping("/save")
    public ResponseEntity<BlogResponseDTO> saveNewBlog(@RequestParam("title") String title,
                                                       @RequestParam("text") String text,
                                                       @RequestParam("file") MultipartFile file,
                                                       Principal principal) {
        return new ResponseEntity(blogService.saveBlog(text, title, file, principal.getName()), HttpStatus.CREATED);
    }

    @PostMapping("/profile")
    public ResponseEntity<List<BlogResponseDTO>> findUserBlog(Principal principal) {
        return ResponseEntity.ok(blogService.findAllByUserName(principal.getName()));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteBlog(@PathVariable("id") Long id) {
        blogService.deleteBlogById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<BlogResponseDTO> findById(@PathVariable("id") Long id)  {
        return new ResponseEntity<>(blogService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/like/{id}")
    public ResponseEntity<?> addLikeToPost(@PathVariable("id") Long id, Principal principal) {
        blogService.addOrRemoveLike(id, principal.getName());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/check/{count}")
    public ResponseEntity<?> checkBlogItems(@PathVariable("count") String count) {
        boolean response = blogService.checkActualCount(Long.parseLong(count));
        return response ?
                new ResponseEntity<>(HttpStatus.OK) :
                new ResponseEntity<>(blogService.findAllLimitTen(0), HttpStatus.ACCEPTED);
    }

}
