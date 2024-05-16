package com.example.bugtrackersystem.services;

import com.example.bugtrackersystem.entity.Project;
import com.example.bugtrackersystem.repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectService projectService;

    private Project project;

    @BeforeEach
    void setUp() {
        project = new Project();
        project.setId("1");
        project.setName("Project1");
        project.setProjectManager("manager@example.com");
        project.setDescription("Description1");
        project.setBugTypes(Arrays.asList("Frontend", "Backend"));
        project.setDevelopers(Arrays.asList("dev1@example.com", "dev2@example.com"));
    }

    @Test
    void createProject_ShouldSaveProject() {
        projectService.createProject("Project1", "Description1", "manager@example.com", Arrays.asList("dev1@example.com", "dev2@example.com"));

        verify(projectRepository, times(1)).save(any(Project.class));
    }

    @Test
    void getProjects_ShouldReturnAllProjects_WhenRoleIsAdmin() {
        when(projectRepository.findAll()).thenReturn(Arrays.asList(project));

        List<Project> projects = projectService.getProjects("admin@example.com", "admin");

        assertEquals(1, projects.size());
        assertEquals("Project1", projects.get(0).getName());
    }

    @Test
    void getProjects_ShouldReturnManagerProjects_WhenRoleIsProductManager() {
        when(projectRepository.findByProjectManager("manager@example.com")).thenReturn(Arrays.asList(project));

        List<Project> projects = projectService.getProjects("manager@example.com", "productManager");

        assertEquals(1, projects.size());
        assertEquals("Project1", projects.get(0).getName());
    }

    @Test
    void getProjects_ShouldReturnDeveloperProjects_WhenRoleIsDeveloper() {
        when(projectRepository.findByDevelopers("dev1@example.com")).thenReturn(Arrays.asList(project));

        List<Project> projects = projectService.getProjects("dev1@example.com", "developer");

        assertEquals(1, projects.size());
        assertEquals("Project1", projects.get(0).getName());
    }

    @Test
    void updateProject_ShouldUpdateProject_WhenProjectExists() {
        when(projectRepository.findById("1")).thenReturn(Optional.of(project));

        projectService.updateProject("1", "UpdatedProject1", "UpdatedDescription1", "updatedManager@example.com", Arrays.asList("updatedDev1@example.com", "updatedDev2@example.com"));

        verify(projectRepository, times(1)).save(project);
        assertEquals("UpdatedProject1", project.getName());
        assertEquals("UpdatedDescription1", project.getDescription());
        assertEquals("updatedManager@example.com", project.getProjectManager());
        assertEquals(Arrays.asList("updatedDev1@example.com", "updatedDev2@example.com"), project.getDevelopers());
    }

    @Test
    void updateProject_ShouldThrowException_WhenProjectDoesNotExist() {
        when(projectRepository.findById("1")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            projectService.updateProject("1", "UpdatedProject1", "UpdatedDescription1", "updatedManager@example.com", Arrays.asList("updatedDev1@example.com", "updatedDev2@example.com"));
        });

        assertEquals("Project not found with id: 1", exception.getMessage());
        verify(projectRepository, times(0)).save(any(Project.class));
    }
}
