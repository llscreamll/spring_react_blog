package com.blog.server.dto;

import com.blog.server.entity.erole.RoleUser;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserRequestDTO {
    @NotBlank(message = " не должно быть пустым")
    @Size(min = 3, max = 40)
    private String name;

    @NotBlank(message = " не должен быть пустым")
    private String login;

    @NotBlank(message = "  не должен быть пустым")
    @Pattern(regexp = "^\\w+@\\w+\\.(ru|com)$",message = " не валидный")
    private String email;

    @Size(min = 5, max = 50 ,message = " размер должен находиться в диапазоне от 5 до 50")
    private String password;
    @Enumerated(EnumType.STRING)
    private RoleUser role;

}
