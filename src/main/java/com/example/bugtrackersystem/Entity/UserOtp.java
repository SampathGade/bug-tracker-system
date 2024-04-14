package com.example.bugtrackersystem.Entity;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "userOtp")
public class UserOtp {
    @Id
    private String id;
    private String userEmail;
    private String otp;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private boolean active;
}

