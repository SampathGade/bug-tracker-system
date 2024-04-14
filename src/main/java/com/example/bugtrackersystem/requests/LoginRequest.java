package com.example.bugtrackersystem.requests;

import lombok.*;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    @NotNull
    private String userEmail;
    @NotNull
    private String password;
}
