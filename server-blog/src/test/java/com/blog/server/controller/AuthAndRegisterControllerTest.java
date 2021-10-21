package com.blog.server.controller;

import com.blog.server.ServerApplication;
import com.blog.server.auth.AuthResponse;
import com.blog.server.dto.UserRequestDTO;
import com.blog.server.entity.User;
import com.blog.server.mapper.UserMapper;
import com.blog.server.repositoty.UserRepository;
import com.blog.server.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
//@WebMvcTest
//@PropertySource("classpath:applicationTest.properties")
public class AuthAndRegisterControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    ObjectMapper objectMapper;



    @Test
    public void registerUser() throws Exception {
        UserRequestDTO userRequestDTO = new UserRequestDTO();
        userRequestDTO.setName("nameTest");
        userRequestDTO.setLogin("loginTest");
        userRequestDTO.setEmail("emailTest@mail.ru");
        userRequestDTO.setPassword("passwordTest");

        when(userService.createUser(any())).thenReturn(new AuthResponse(UserMapper.fromUserRequestDTOToUser(userRequestDTO), "testToken"));

        mockMvc.perform(post("/register")
                        .content(objectMapper.writeValueAsString(userRequestDTO))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("email").value("emailTest@mail.ru"))
                .andExpect(jsonPath("name").value("nameTest"))
                .andExpect(jsonPath("token").value("testToken"));

    }

    @Test
    public void auth() {
    }

    @Test
    public void checkLoginData() {
    }
}

