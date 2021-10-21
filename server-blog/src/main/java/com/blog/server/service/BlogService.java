package com.blog.server.service;

import com.blog.server.config.CustomUserDetails;
import com.blog.server.dto.BlogResponseDTO;
import com.blog.server.dto.ImageResponseDao;
import com.blog.server.entity.Blog;
import com.blog.server.entity.User;
import com.blog.server.exception.BlogNotFoundException;
import com.blog.server.exception.NotFoundException;
import com.blog.server.repositoty.BlogRepository;
import com.blog.server.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogService {

    private final BlogRepository blogRepository;
    private final UserService userService;
    private final StorageService storageService;

    @Autowired
    public BlogService(BlogRepository blogRepository, UserService userService, StorageService storageService) {
        this.blogRepository = blogRepository;
        this.userService = userService;

        this.storageService = storageService;
    }

    public HashMap<String, Object> findAllLimitTen(Integer page) {
        int COUNT_BLOG_TO_RETURN = 10;
        HashMap<String, Object> responseMap = new HashMap<>();
        Page<Blog> seatNumber = blogRepository.findAll(PageRequest.of(page, COUNT_BLOG_TO_RETURN, Sort.by(Sort.Direction.DESC, "id")));
        List<Blog> content = seatNumber.getContent();
        List<BlogResponseDTO> collect = content.stream().map(el -> new BlogResponseDTO(el, storageService.loadImage(el.getImageName()))).collect(Collectors.toList());
        responseMap.put("blog", collect);
        responseMap.put("count_element", seatNumber.getTotalElements());
        responseMap.put("total_page", seatNumber.getTotalPages());
        return responseMap;
    }

    public BlogResponseDTO findById(Long id) {
        Blog blog = blogRepository.findById(id).orElseThrow(NotFoundException::new);
        String imageName = blog.getImageName();
        ImageResponseDao imageByName = storageService.loadImage(imageName);
        return new BlogResponseDTO(blog, imageByName);
    }

    public List<BlogResponseDTO> findAllByUserName(String userLogin) {
        User user = userService.finedUserByLogin(userLogin);
        List<Blog> allByUser = blogRepository.findAllByUserId(user.getId());
        return allByUser.stream().map(el -> new BlogResponseDTO(el, storageService.loadImage(el.getImageName()))).collect(Collectors.toList());
    }

    public BlogResponseDTO saveBlog(String text, String title, MultipartFile file, String userName) {
        User user = userService.finedUserByLogin(userName);
        ImageResponseDao imageResponseDao = storageService.loadImage(storageService.saveImage(file));
        Blog blog = new Blog(text, title, user, imageResponseDao.getName());
        return new BlogResponseDTO(blogRepository.save(blog), imageResponseDao);
    }

    public boolean checkActualCount(Long countBlog) {
        Long count = blogRepository.findMaxCount();
        return count.equals(countBlog);
    }

    @Transactional
    public void deleteBlogById(Long id) {
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        //check whether the user is the creator of the post
        boolean checkUserAndBlogId = blogRepository.existsByIdAndUserId(id, customUserDetails.getId());
        if (checkUserAndBlogId) {
            blogRepository.deleteBlogById(id);
        }
        throw new BlogNotFoundException();
    }

    public void addOrRemoveLike(Long id, String userName) {
        Blog blog = blogRepository.findById(id).orElseThrow(NotFoundException::new);
        boolean containsUser = blog.getLikeUsers().contains(userName);
        if (!containsUser) {
            blog.setCountLikes(blog.getCountLikes() + 1);
            blog.getLikeUsers().add(userName);
        } else {
            blog.setCountLikes(blog.getCountLikes() - 1);
            blog.getLikeUsers().remove(userName);
        }
        blogRepository.save(blog);
    }
}