package com.example.bugtrackersystem.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectAddRequest {
//    @Id
//    private String id;
    @NotBlank
    private String name;
}
