package com.example.bugtrackersystem.controllers;

import com.example.bugtrackersystem.entity.Project;
import com.example.bugtrackersystem.requests.CreateProjectRequest;
import com.example.bugtrackersystem.requests.GetProjectsRequest;
import com.example.bugtrackersystem.requests.UpdateProjectRequest;
import com.example.bugtrackersystem.services.ProjectService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ProjectControllerTest {

    @InjectMocks
    private ProjectController projectController;

    @Mock
    private ProjectService projectService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createProject_Success() {
        CreateProjectRequest request = new CreateProjectRequest();
        request.setName("Test Project");
        request.setDescription("Test Description");
        request.setProjectManager("Manager");
        request.setUsers(Arrays.asList("user1", "user2"));

        doNothing().when(projectService).createProject(anyString(), anyString(), anyString(), anyList());

        ResponseEntity<?> response = projectController.createProject(request);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("project created successfully ", response.getBody());
    }

    @Test
    void createProject_InternalServerError() {
        CreateProjectRequest request = new CreateProjectRequest();
        request.setName("Test Project");
        request.setDescription("Test Description");
        request.setProjectManager("Manager");
        request.setUsers(Arrays.asList("user1", "user2"));

        doThrow(new RuntimeException("Internal error")).when(projectService).createProject(anyString(), anyString(), anyString(), anyList());

        ResponseEntity<?> response = projectController.createProject(request);

        assertEquals(500, response.getStatusCodeValue());
        assertEquals("An internal server error occurred. Please try again.", response.getBody());
    }

    @Test
    void getProjects_Success() {
        GetProjectsRequest request = new GetProjectsRequest();
        request.setEmail("test@example.com");
        request.setRole("Developer");

        List<Project> projects = Arrays.asList(new Project(), new Project());
        when(projectService.getProjects(anyString(), anyString())).thenReturn(projects);

        ResponseEntity<?> response = projectController.getProjects(request);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(projects, response.getBody());
    }

    @Test
    void getProjects_InternalServerError() {
        GetProjectsRequest request = new GetProjectsRequest();
        request.setEmail("test@example.com");
        request.setRole("Developer");

        when(projectService.getProjects(anyString(), anyString())).thenThrow(new RuntimeException("Internal error"));

        ResponseEntity<?> response = projectController.getProjects(request);

        assertEquals(500, response.getStatusCodeValue());
        assertEquals("An internal server error occurred. Please try again.", response.getBody());
    }

    @Test
    void updateProject_Success() {
        UpdateProjectRequest request = new UpdateProjectRequest();
        request.setId("123");
        request.setName("Updated Project");
        request.setDescription("Updated Description");
        request.setProductManager("Updated Manager");
        request.setDevelopers(Arrays.asList("dev1", "dev2"));

        doNothing().when(projectService).updateProject(anyString(), anyString(), anyString(), anyString(), anyList());

        ResponseEntity<?> response = projectController.updateProject(request);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("updated project", response.getBody());
    }

    @Test
    void updateProject_InternalServerError() {
        UpdateProjectRequest request = new UpdateProjectRequest();
        request.setId("123");
        request.setName("Updated Project");
        request.setDescription("Updated Description");
        request.setProductManager("Updated Manager");
        request.setDevelopers(Arrays.asList("dev1", "dev2"));

        doThrow(new RuntimeException("Internal error")).when(projectService).updateProject(anyString(), anyString(), anyString(), anyString(), anyList());

        ResponseEntity<?> response = projectController.updateProject(request);

        assertEquals(500, response.getStatusCodeValue());
        assertEquals("An internal server error occurred. Please try again.", response.getBody());
    }
}
