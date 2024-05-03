package com.example.bugtrackersystem.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequest {
    @NonNull
    private String email;
    @NonNull
    private String password;
    @NonNull
    private String role;
    private String otp;
}
