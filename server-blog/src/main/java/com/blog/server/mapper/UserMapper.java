package com.blog.server.mapper;

import com.blog.server.config.CustomUserDetails;
import com.blog.server.dto.UserRequestDTO;
import com.blog.server.dto.UserResponseDTO;
import com.blog.server.entity.User;
import com.blog.server.entity.erole.RoleUser;


public class UserMapper {

   public static UserResponseDTO fromUserToUserResponseDTO(User user) {
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setEmail(user.getEmail());
        userResponseDTO.setId(user.getId());
        userResponseDTO.setName(user.getName());
        userResponseDTO.setLogin(user.getLogin());
        userResponseDTO.setStatus(user.getStatus());
        return userResponseDTO;
    }

    public static UserResponseDTO fromCustomerUserToResponseDTO(CustomUserDetails customUserDetails){
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setLogin(customUserDetails.getUsername());
        userResponseDTO.setName(customUserDetails.getName());
        userResponseDTO.setId(customUserDetails.getId());
        userResponseDTO.setEmail(customUserDetails.getEmail());
        userResponseDTO.setStatus(customUserDetails.getStatus());
        return userResponseDTO;
    }

    public static User fromUserRequestDTOToUser(UserRequestDTO userRequestDTO) {
        User user = new User();
        user.setLogin(userRequestDTO.getLogin());
        user.setPassword(userRequestDTO.getPassword());
        user.setEmail(userRequestDTO.getEmail());
        user.setName(userRequestDTO.getName());

        if (userRequestDTO.getRole() == null) {
            user.setRole(RoleUser.ROLE_USER);
        } else {
            user.setRole(userRequestDTO.getRole());
        }
        return user;
    }

}
