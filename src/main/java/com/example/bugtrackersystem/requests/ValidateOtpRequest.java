package com.example.bugtrackersystem.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValidateOtpRequest {
    @NonNull
    private String userId;
    @NonNull
    private String otp;
}
