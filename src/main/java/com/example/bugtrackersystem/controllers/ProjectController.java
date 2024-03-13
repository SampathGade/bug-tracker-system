package com.example.bugtrackersystem.controllers;

import com.example.bugtrackersystem.requests.ProjectAddRequest;
import com.example.bugtrackersystem.services.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/project")
@RequiredArgsConstructor
public class ProjectController {
    @Autowired
    private final ProjectService projectService;

    @PostMapping("/add")
    public ResponseEntity<?> login(@Valid @RequestBody ProjectAddRequest projectAddRequest) {
        projectService.save(projectAddRequest);
        return ResponseEntity.ok("Added a Project");
    }

}
