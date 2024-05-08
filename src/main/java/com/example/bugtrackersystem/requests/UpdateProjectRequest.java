package com.example.bugtrackersystem.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProjectRequest {
    private String id;
    private String name;
    private String description;
    private String productManager;
    private List<String> developers;
}
