package com.example.bugtrackersystem.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "userDetails")  // Specifies the collection name in MongoDB
@Data
@NoArgsConstructor
public class User {
    @Id
    private String id;

    @Indexed(unique = true)  // Ensures that the email is unique across all documents in the users collection
    private String email;

    private String password; // This should ideally be stored as a hashed value
    private String otp;
    private LocalDateTime otpExpiry;
    private String role;
    private String status;
    private String projectManager;
    private List<Session> sessions;
    private Performance performances;
    private String firstName;
    private String lastName;

    // Additional constructors and methods can be added as needed
}

