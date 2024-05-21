package com.example.bugtrackersystem.services.User;

import com.example.bugtrackersystem.entity.Project;
import com.example.bugtrackersystem.entity.User;
import com.example.bugtrackersystem.repository.ProjectRepository;
import com.example.bugtrackersystem.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private UserService userService;

    private User user;
    private Project project;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setEmail("user@example.com");
        user.setRole("developer");
        user.setProjectManager("manager@example.com");
        user.setStatus("Onboarded");

        project = new Project();
        project.setName("Project1");
        project.setDevelopers(Arrays.asList("dev1@example.com", "dev2@example.com"));
    }

    @Test
    void getUserDetails_ShouldReturnOnboardedUsers_WhenRoleIsAdmin() {
        when(userRepository.findByStatus("Onboarded")).thenReturn(Arrays.asList(user));

        List<User> users = userService.getUserDetails("admin", "admin@example.com");

        assertEquals(1, users.size());
        assertEquals("user@example.com", users.get(0).getEmail());
    }

    @Test
    void getUserDetails_ShouldReturnOnboardedUsersByProjectManager_WhenRoleIsNotAdmin() {
        when(userRepository.findByStatusAndProjectManager("Onboarded", "manager@example.com")).thenReturn(Arrays.asList(user));

        List<User> users = userService.getUserDetails("projectManager", "manager@example.com");

        assertEquals(1, users.size());
        assertEquals("user@example.com", users.get(0).getEmail());
    }

    @Test
    void updateUserDetails_ShouldUpdateUser_WhenUserExists() {
        when(userRepository.findByEmail("user@example.com")).thenReturn(user);

        userService.updateUserDetails("user@example.com", "qa", "newManager@example.com");

        verify(userRepository, times(1)).save(user);
        assertEquals("qa", user.getRole());
        assertEquals("newManager@example.com", user.getProjectManager());
    }

    @Test
    void updateUserDetails_ShouldDoNothing_WhenUserDoesNotExist() {
        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(null);

        userService.updateUserDetails("nonexistent@example.com", "qa", "newManager@example.com");

        verify(userRepository, times(0)).save(any(User.class));
    }

    @Test
    void getProjectManagers_ShouldReturnProjectManagers() {
        when(userRepository.findByRoleAndStatus("projectManager","Onboarded")).thenReturn(Arrays.asList(user));

        List<User> projectManagers = userService.getProjectManagers();

        assertEquals(1, projectManagers.size());
        assertEquals("user@example.com", projectManagers.get(0).getEmail());
    }

    @Test
    void getProjectManagers_ShouldReturnEmptyList_WhenNoProjectManagersFound() {
        when(userRepository.findByRoleAndStatus("projectManager","Onboarded")).thenReturn(null);

        List<User> projectManagers = userService.getProjectManagers();

        assertEquals(0, projectManagers.size());
    }

    @Test
    void getDevelopersAndTesters_ShouldReturnDevelopersAndTesters() {
        when(userRepository.findByRoles(Arrays.asList("developer", "qa"))).thenReturn(Arrays.asList(user));

        List<User> developersAndTesters = userService.getDevelopersAndTesters();

        assertEquals(1, developersAndTesters.size());
        assertEquals("user@example.com", developersAndTesters.get(0).getEmail());
    }

    @Test
    void getDevelopersAndTesters_ShouldReturnEmptyList_WhenNoDevelopersOrTestersFound() {
        when(userRepository.findByRoles(Arrays.asList("developer", "qa"))).thenReturn(null);

        List<User> developersAndTesters = userService.getDevelopersAndTesters();

        assertEquals(0, developersAndTesters.size());
    }

    @Test
    void getDevelopersByProject_ShouldReturnDevelopers_WhenProjectExists() {
        when(projectRepository.findByName("Project1")).thenReturn(project);

        List<String> developers = userService.getDevelopersByProject("Project1");

        assertEquals(2, developers.size());
        assertEquals("dev1@example.com", developers.get(0));
        assertEquals("dev2@example.com", developers.get(1));
    }

    @Test
    void getDevelopersByProject_ShouldReturnEmptyList_WhenProjectDoesNotExist() {
        when(projectRepository.findByName("NonexistentProject")).thenReturn(null);

        List<String> developers = userService.getDevelopersByProject("NonexistentProject");

        assertEquals(0, developers.size());
    }

    @Test
    void getDevelopersByProject_ShouldReturnEmptyList_WhenProjectHasNoDevelopers() {
        Project emptyProject = new Project();
        emptyProject.setName("EmptyProject");
        emptyProject.setDevelopers(null);

        when(projectRepository.findByName("EmptyProject")).thenReturn(emptyProject);

        List<String> developers = userService.getDevelopersByProject("EmptyProject");

        assertEquals(0, developers.size());
    }
}
