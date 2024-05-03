package com.example.bugtrackersystem.requests;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateStatusRequest {
    @NonNull
    private String email;
    @NonNull
    private String role;
    @NonNull
    private String status;
    private String projectManager;
}
