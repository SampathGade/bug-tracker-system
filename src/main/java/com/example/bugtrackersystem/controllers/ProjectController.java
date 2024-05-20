package com.example.bugtrackersystem.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.bugtrackersystem.entity.Project;
import com.example.bugtrackersystem.requests.CreateProjectRequest;
import com.example.bugtrackersystem.requests.GetProjectsRequest;
import com.example.bugtrackersystem.requests.UpdateProjectRequest;
import com.example.bugtrackersystem.requests.UpdateUserRequest;
import com.example.bugtrackersystem.services.ProjectService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping("/createProject")
    public ResponseEntity<?> createProject(@RequestBody CreateProjectRequest createProjectRequest) {
        try {
            projectService.createProject(createProjectRequest.getName(), createProjectRequest.getDescription(),
                    createProjectRequest.getProjectManager(), createProjectRequest.getDevelopers());
            return ResponseEntity.ok().body("project created successfully ");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An internal server error occurred. Please try again.");
        }
    }

    @PostMapping("/getProjects")
    public ResponseEntity<?> getProjects(@RequestBody GetProjectsRequest getProjectsRequest) {
        try {
            List<Project> projectList = projectService.getProjects(getProjectsRequest.getEmail(), getProjectsRequest.getRole());
            return ResponseEntity.ok().body(projectList);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An internal server error occurred. Please try again.");
        }
    }

    @PostMapping("/updateProject")
    public ResponseEntity<?> updateProject(@RequestBody UpdateProjectRequest updateProjectRequest) {
        try {
            projectService.updateProject(updateProjectRequest.getId(), updateProjectRequest.getName(), updateProjectRequest.getDescription(),updateProjectRequest.getProductManager(),
                    updateProjectRequest.getDevelopers());
            return ResponseEntity.ok().body("updated project");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An internal server error occurred. Please try again.");
        }
    }
}
