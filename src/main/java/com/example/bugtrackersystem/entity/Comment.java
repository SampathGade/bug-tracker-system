package com.example.bugtrackersystem.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class Comment {
    private String author;
    private String text;

}
