package com.example.bugtrackersystem.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValidateReqistrationRequest {
    @NonNull
    private String userEmail;
    @NonNull
    private String role;
    @NonNull
    private Boolean approve;
}
