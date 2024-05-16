package com.example.bugtrackersystem.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import com.example.bugtrackersystem.entity.User;
import com.example.bugtrackersystem.requests.GetUsersRequest;
import com.example.bugtrackersystem.requests.UpdateUserRequest;
import com.example.bugtrackersystem.services.User.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;

    @BeforeEach
    void setUp() {
    }

    @Test
    void getUserDetails_Success() {
        // Arrange
        GetUsersRequest getUsersRequest = new GetUsersRequest();
        getUsersRequest.setEmail("test@example.com");
        getUsersRequest.setRole("developer");

        List<User> users = new ArrayList<>();
        users.add(new User());

        when(userService.getUserDetails(anyString(), anyString())).thenReturn(users);

        // Act
        ResponseEntity<?> responseEntity = userController.getUserDetails(getUsersRequest);

        // Assert
        assertEquals(200, responseEntity.getStatusCodeValue());
        assertEquals(users, responseEntity.getBody());
    }

    @Test
    void getUserDetails_Failure() {
        // Arrange
        GetUsersRequest getUsersRequest = new GetUsersRequest();
        getUsersRequest.setEmail("test@example.com");
        getUsersRequest.setRole("developer");

        when(userService.getUserDetails(anyString(), anyString())).thenThrow(new RuntimeException("Error"));

        // Act
        ResponseEntity<?> responseEntity = userController.getUserDetails(getUsersRequest);

        // Assert
        assertEquals(500, responseEntity.getStatusCodeValue());
        assertEquals("An internal server error occurred. Please try again.", responseEntity.getBody());
    }

    @Test
    void updateUserDetails_Success() {
        // Arrange
        UpdateUserRequest updateUserRequest = new UpdateUserRequest();
        updateUserRequest.setEmail("test@example.com");
        updateUserRequest.setRole("developer");
        updateUserRequest.setProjectManager("manager");

        // Act
        ResponseEntity<?> responseEntity = userController.updateUserDetails(updateUserRequest);

        // Assert
        assertEquals(200, responseEntity.getStatusCodeValue());
        assertEquals("user updated successfully ", responseEntity.getBody());
    }

    @Test
    void updateUserDetails_Failure() {
        // Arrange
        UpdateUserRequest updateUserRequest = new UpdateUserRequest();
        updateUserRequest.setEmail("test@example.com");
        updateUserRequest.setRole("developer");
        updateUserRequest.setProjectManager("manager");

        doThrow(new RuntimeException("Error")).when(userService).updateUserDetails(anyString(), anyString(), anyString());

        // Act
        ResponseEntity<?> responseEntity = userController.updateUserDetails(updateUserRequest);

        // Assert
        assertEquals(500, responseEntity.getStatusCodeValue());
        assertEquals("An internal server error occurred. Please try again.", responseEntity.getBody());
    }

    @Test
    void getProjectManagers_Success() {
        // Arrange
        List<User> users = new ArrayList<>();
        users.add(new User());

        when(userService.getProjectManagers()).thenReturn(users);

        // Act
        ResponseEntity<?> responseEntity = userController.getProjectManagers();

        // Assert
        assertEquals(200, responseEntity.getStatusCodeValue());
        assertEquals(users, responseEntity.getBody());
    }

    @Test
    void getProjectManagers_Failure() {
        // Arrange
        when(userService.getProjectManagers()).thenThrow(new RuntimeException("Error"));

        // Act
        ResponseEntity<?> responseEntity = userController.getProjectManagers();

        // Assert
        assertEquals(500, responseEntity.getStatusCodeValue());
        assertEquals("An internal server error occurred. Please try again.", responseEntity.getBody());
    }

    @Test
    void getDevelopers_Success() {
        // Arrange
        List<User> users = new ArrayList<>();
        users.add(new User());

        when(userService.getDevelopersAndTesters()).thenReturn(users);

        // Act
        ResponseEntity<?> responseEntity = userController.getDevelopers();

        // Assert
        assertEquals(200, responseEntity.getStatusCodeValue());
        assertEquals(users, responseEntity.getBody());
    }

    @Test
    void getDevelopers_Failure() {
        // Arrange
        when(userService.getDevelopersAndTesters()).thenThrow(new RuntimeException("Error"));

        // Act
        ResponseEntity<?> responseEntity = userController.getDevelopers();

        // Assert
        assertEquals(500, responseEntity.getStatusCodeValue());
        assertEquals("An internal server error occurred. Please try again.", responseEntity.getBody());
    }

    @Test
    void getDevelopersByProject_Success() {
        // Arrange
        List<String> developers = new ArrayList<>();
        developers.add("developer1");

        when(userService.getDevelopersByProject(anyString())).thenReturn(developers);

        // Act
        ResponseEntity<?> responseEntity = userController.getDevelopersByProject("project1");

        // Assert
        assertEquals(200, responseEntity.getStatusCodeValue());
        assertEquals(developers, responseEntity.getBody());
    }

    @Test
    void getDevelopersByProject_Failure() {
        // Arrange
        when(userService.getDevelopersByProject(anyString())).thenThrow(new RuntimeException("Error"));

        // Act
        ResponseEntity<?> responseEntity = userController.getDevelopersByProject("project1");

        // Assert
        assertEquals(500, responseEntity.getStatusCodeValue());
        assertEquals("An internal server error occurred. Please try again.", responseEntity.getBody());
    }
}
