package com.blog.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileUserResponseDTO {
    private UserResponseDTO  user;
    private List<BlogResponseDTO> blogs = new ArrayList<>();
}
