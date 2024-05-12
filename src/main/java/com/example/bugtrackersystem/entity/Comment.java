package com.example.bugtrackersystem.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;

@NoArgsConstructor
@Data
public class Comment {
    @Id
    private String id;
    private String author;
    private String text;
    private List<String> imageUrls;  // URLs to images stored in Cloudinary
}
