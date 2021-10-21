package com.blog.server.service;

import com.blog.server.auth.AuthRequest;
import com.blog.server.auth.AuthResponse;
import com.blog.server.dto.UserRequestDTO;
import com.blog.server.dto.UserResponseDTO;
import com.blog.server.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@SpringBootTest(properties = "applicationTest.properties")
class UserServiceTest {

    private final String NAME = "nameTest";
    private final String LOGIN = "loginTest";
    private final String EMAIL = "testEmail@mail.ru";
    private final String PASSWORD = "testPassword";

    @Autowired
    private UserService userService;

    @Test
    void createUser() {
        UserRequestDTO newUser = new UserRequestDTO();
        newUser.setLogin(LOGIN);
        newUser.setName(NAME);
        newUser.setEmail(EMAIL);
        newUser.setPassword(PASSWORD);

        AuthResponse userResponse = userService.createUser(newUser);

        assertEquals(userResponse.getLogin(), newUser.getLogin());
        assertEquals(userResponse.getEmail(),newUser.getEmail());
        assertNotNull(userResponse.getToken());

    }

    @Test
    void findUserById() {
        UserRequestDTO newUser = new UserRequestDTO();
        newUser.setLogin(LOGIN);
        newUser.setName(NAME);
        newUser.setEmail(EMAIL);
        newUser.setPassword(PASSWORD);

        AuthResponse authResponse = userService.createUser(newUser);

        User userById = userService.findUserById(authResponse.getId());

        assertEquals(userById.getLogin(), newUser.getLogin());
        assertEquals(userById.getEmail(),newUser.getEmail());
    }

    @Test
    void getUserData() {
    }

    @Test
    void finedUserByLogin() {
        UserRequestDTO newUser = new UserRequestDTO();
        newUser.setLogin(LOGIN);
        newUser.setName(NAME);
        newUser.setEmail(EMAIL);
        newUser.setPassword(PASSWORD);

        AuthResponse authResponse = userService.createUser(newUser);

        User userById = userService.finedUserByLogin(authResponse.getLogin());

        assertEquals(userById.getLogin(), newUser.getLogin());
        assertEquals(userById.getEmail(),newUser.getEmail());
    }

    @Test
    void checkLoginAndPassword() {
        UserRequestDTO newUser = new UserRequestDTO();
        newUser.setLogin(LOGIN);
        newUser.setName(NAME);
        newUser.setEmail(EMAIL);
        newUser.setPassword(PASSWORD);

        userService.createUser(newUser);

        AuthResponse authResponse1 = userService.checkLoginAndPassword(new AuthRequest(newUser.getLogin(), newUser.getPassword()));

        assertEquals(authResponse1.getLogin(), newUser.getLogin());
        assertEquals(authResponse1.getEmail(),newUser.getEmail());
    }

    @Test
    void getAllUsers() {
        UserRequestDTO newUser = new UserRequestDTO();
        newUser.setLogin(LOGIN);
        newUser.setName(NAME);
        newUser.setEmail(EMAIL);
        newUser.setPassword(PASSWORD);

        UserRequestDTO newUser2 = new UserRequestDTO();
        newUser2.setLogin("1" + LOGIN);
        newUser2.setName("1" +NAME);
        newUser2.setEmail("1" + EMAIL);
        newUser2.setPassword("1" + PASSWORD);

        userService.createUser(newUser);
        userService.createUser(newUser2);

        List<UserResponseDTO> allUsers = userService.getAllUsers();
        assertEquals(2,allUsers.size());
    }

    @Test
    void setStatus() {
        UserRequestDTO newUser = new UserRequestDTO();
        newUser.setLogin(LOGIN);
        newUser.setName(NAME);
        newUser.setEmail(EMAIL);
        newUser.setPassword(PASSWORD);

        AuthResponse user = userService.createUser(newUser);

        userService.setStatus("my test status",LOGIN);

        User userById = userService.findUserById(user.getId());
        assertEquals(userById.getStatus(),"my test status");
    }
}