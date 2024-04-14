package com.example.bugtrackersystem.Entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "userDetails")
public class User {
    @Id
    private String userId;

    @Indexed(unique = true)
    private String userEmail;
    private String role;
    private List<String> projects;
    private String password;
    private String status;
}


