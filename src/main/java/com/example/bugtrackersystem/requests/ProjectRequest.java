package com.example.bugtrackersystem.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRequest {
    @NotBlank(message = "Project name is required")
    @Size(min = 3, max = 255, message = "Project name must be between 3 and 255 characters")
    private String name;

    @NotBlank(message = "Project code is required")
    @Size(min = 2, max = 10, message = "Project code must be between 2 and 10 characters")
    private String code;

    // If you want the client to specify a project manager upon project creation
    // and assuming you identify users/managers by some sort of unique identifier in your system
    private String projectManagerId;

    // Constructors, Getters, and Setters



    // Getters
    public String getName() {
        return name;
    }

    public String getCode() {
        return code;
    }

    public String getProjectManagerId() {
        return projectManagerId;
    }

    // Setters
    public void setName(String name) {
        this.name = name;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setProjectManagerId(String projectManagerId) {
        this.projectManagerId = projectManagerId;
    }
}
