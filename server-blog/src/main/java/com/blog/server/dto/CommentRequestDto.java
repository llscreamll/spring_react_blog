package com.blog.server.dto;


import lombok.*;

import javax.validation.constraints.Size;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class CommentRequestDto {
    @NonNull
    private Long blogId;
    @NonNull
    private Long userId;
    @Size(min = 5,max = 500,message = "комментарий должен быть от 5 до 500 символов")
    @NonNull
    private String text;
}
