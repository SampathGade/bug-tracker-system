package com.example.bugtrackersystem.controllers;

import com.example.bugtrackersystem.entity.Bug;
import com.example.bugtrackersystem.entity.User;
import com.example.bugtrackersystem.repository.BugRepository;
import com.example.bugtrackersystem.requests.CreateBugRequest;
import com.example.bugtrackersystem.requests.GetUsersRequest;
import com.example.bugtrackersystem.requests.UserDetails;
import com.example.bugtrackersystem.services.BugService;
import com.example.bugtrackersystem.services.DeveloperSelectionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BugControllerTest {

    @InjectMocks
    private BugController bugController;

    @Mock
    private BugService bugService;

    @Mock
    private DeveloperSelectionService developerSelectionService;

    @Mock
    private BugRepository bugRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getBugs_success() {
        GetUsersRequest getUsersRequest = new GetUsersRequest();
        List<Bug> bugList = new ArrayList<>();
        when(bugService.getBugs(anyString(), anyString(), anyString(), anyList(), anyString())).thenReturn(bugList);

        ResponseEntity<?> response = bugController.getBugs(getUsersRequest);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(bugList, response.getBody());
    }

    @Test
    void getBugs_exception() {
        GetUsersRequest getUsersRequest = new GetUsersRequest();
        when(bugService.getBugs(any(), any(), any(), any(), any())).thenThrow(RuntimeException.class);

        ResponseEntity<?> response = bugController.getBugs(getUsersRequest);

        assertEquals(500, response.getStatusCodeValue());
        assertEquals("An internal server error occurred. Please try again.", response.getBody());
    }

    @Test
    void createBug_success() {
        CreateBugRequest createBugRequest = new CreateBugRequest();
        Bug bug = new Bug();
        UserDetails userDetails = new UserDetails();
        userDetails.setEmail("test@example.com");
        userDetails.setId("1");
        createBugRequest.setBug(bug);
        createBugRequest.setUserDetails(userDetails);
        bug.setAssignee("auto");
        when(developerSelectionService.findBestFitDeveloper(anyString(), anyString())).thenReturn("developer1");

        ResponseEntity<?> response = bugController.createBug(createBugRequest);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("bug created succesfully", response.getBody());
        verify(bugRepository, times(1)).save(bug);
    }

    @Test
    void createBug_exception() {
        CreateBugRequest createBugRequest = new CreateBugRequest();
        Bug bug = new Bug();
        UserDetails userDetails = new UserDetails();
        createBugRequest.setBug(bug);
        createBugRequest.setUserDetails(userDetails);
        when(bugRepository.save(any(Bug.class))).thenThrow(RuntimeException.class);

        ResponseEntity<?> response = bugController.createBug(createBugRequest);

        assertEquals(500, response.getStatusCodeValue());
        assertEquals("An internal server error occurred. Please try again.", response.getBody());
    }

    @Test
    void updateBug_success() {
        Bug bug = new Bug();
        bug.setId("1");
        Bug existingBug = new Bug();
        when(bugRepository.findById(anyString())).thenReturn(Optional.of(existingBug));

        ResponseEntity<?> response = bugController.updateBug(bug);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Bug status updated successfully", response.getBody());
        verify(bugRepository, times(1)).save(existingBug);
    }

    @Test
    void updateBug_notFound() {
        Bug bug = new Bug();
        bug.setId("1");
        when(bugRepository.findById(anyString())).thenReturn(Optional.empty());

        ResponseEntity<?> response = bugController.updateBug(bug);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    void updateBug_exception() {
        Bug bug = new Bug();
        bug.setId("1");
        when(bugRepository.findById(anyString())).thenThrow(RuntimeException.class);

        ResponseEntity<?> response = bugController.updateBug(bug);

        assertEquals(500, response.getStatusCodeValue());
        assertEquals("An internal server error occurred. Please try again.", response.getBody());
    }

    @Test
    void updateBugStatus_success() {
        Bug bug = new Bug();
        bug.setId("1");
        Bug existingBug = new Bug();
        when(bugRepository.findById(anyString())).thenReturn(Optional.of(existingBug));

        ResponseEntity<?> response = bugController.updateBugStatus(bug);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Bug status updated successfully", response.getBody());
        verify(bugRepository, times(1)).save(existingBug);
    }

    @Test
    void updateBugStatus_notFound() {
        Bug bug = new Bug();
        bug.setId("1");
        when(bugRepository.findById(anyString())).thenReturn(Optional.empty());

        ResponseEntity<?> response = bugController.updateBugStatus(bug);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    void updateBugStatus_exception() {
        Bug bug = new Bug();
        bug.setId("1");
        when(bugRepository.findById(anyString())).thenThrow(RuntimeException.class);

        ResponseEntity<?> response = bugController.updateBugStatus(bug);

        assertEquals(500, response.getStatusCodeValue());
        assertTrue(response.getBody().toString().contains("An internal server error occurred"));
    }

    @Test
    void deleteBug_success() {
        doNothing().when(bugService).deleteBug(anyString());

        ResponseEntity<String> response = bugController.deleteBug("1");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Bug deleted successfully.", response.getBody());
        verify(bugService, times(1)).deleteBug("1");
    }

    @Test
    void deleteBug_exception() {
        doThrow(RuntimeException.class).when(bugService).deleteBug(anyString());

        ResponseEntity<String> response = bugController.deleteBug("1");

        assertEquals(500, response.getStatusCodeValue());
        assertEquals("Failed to delete bug due to server error.", response.getBody());
    }
}
