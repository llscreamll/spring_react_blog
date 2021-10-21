package com.blog.server.service;

import com.blog.server.auth.AuthRequest;
import com.blog.server.auth.AuthResponse;
import com.blog.server.config.CustomUserDetails;
import com.blog.server.dto.UserRequestDTO;
import com.blog.server.dto.UserResponseDTO;
import com.blog.server.entity.User;
import com.blog.server.exception.LoginAndPasswordException;
import com.blog.server.exception.LoginOrEmailIsBusyException;
import com.blog.server.exception.NotFoundException;
import com.blog.server.mapper.UserMapper;
import com.blog.server.repositoty.UserRepository;
import com.blog.server.security.JWTTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JWTTokenProvider jwtProvider;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, JWTTokenProvider jwtProvider) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtProvider = jwtProvider;
    }


    public User findUserById(Long id) {
        return userRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    public AuthResponse createUser(UserRequestDTO userRequestDTO) {
        boolean verification = userRepository.existsByLoginOrEmail(userRequestDTO.getLogin(), userRequestDTO.getEmail());
        if (verification) {
            throw new LoginOrEmailIsBusyException();
        }
        User newUser = UserMapper.fromUserRequestDTOToUser(userRequestDTO);
        String token = jwtProvider.generateToken(newUser.getLogin());
        newUser.setPassword(bCryptPasswordEncoder.encode(userRequestDTO.getPassword()));
        userRepository.save(newUser);
        return new AuthResponse(newUser, token);
    }

    public UserResponseDTO getUserData(CustomUserDetails customUserDetails){
        if (customUserDetails != null) {
            return UserMapper.fromCustomerUserToResponseDTO(customUserDetails);
        }
        throw new LoginAndPasswordException();
    }

    public User finedUserByLogin(String login) {
            return userRepository.findByLogin(login).orElseThrow(NotFoundException::new);
    }

    public AuthResponse checkLoginAndPassword(AuthRequest authRequest) {
        User user = userRepository.findByLogin(authRequest.getLogin()).orElseThrow(LoginAndPasswordException::new);
        if (bCryptPasswordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            String token = jwtProvider.generateToken(user.getLogin());
            return new AuthResponse(user.getId(), user.getName(), user.getLogin(), user.getEmail(), user.getStatus(), token);
        }
        throw new LoginAndPasswordException();
    }

    public List<UserResponseDTO> getAllUsers() {
        List<User> allUser = userRepository.findAll();
        return allUser.stream().map(UserMapper::fromUserToUserResponseDTO).collect(Collectors.toList());

    }

    public void setStatus(String status, String userName) {
        userRepository.updateStatus(status,userName);
    }


}
