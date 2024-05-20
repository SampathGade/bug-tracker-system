package com.example.bugtrackersystem.services;

import com.example.bugtrackersystem.entity.Bug;
import com.example.bugtrackersystem.repository.BugRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BugServiceTest {

    @Mock
    private BugRepository bugRepository;

    @InjectMocks
    private BugService bugService;

    private List<Bug> bugList;

    @BeforeEach
    void setUp() {
        Bug bug1 = new Bug();
        Bug bug2 = new Bug();
        bugList = Arrays.asList(bug1, bug2);
    }

    @Test
    void testGetBugs_AdminRole_WithAssignee() {
        when(bugRepository.findByProjectAndAssigneeAndSprint(anyString(), anyList(), anyString())).thenReturn(bugList);
        List<Bug> result = bugService.getBugs("admin", "test@example.com", "Project1", Arrays.asList("dev1"), "Sprint1");
        assertEquals(bugList, result);
    }

    @Test
    void testGetBugs_AdminRole_WithoutAssignee() {
        when(bugRepository.findByProjectAndSprint(anyString(), anyString())).thenReturn(bugList);
        List<Bug> result = bugService.getBugs("admin", "test@example.com", "Project1", null, "Sprint1");
        assertEquals(bugList, result);
    }

    @Test
    void testGetBugs_ProjectManagerRole_WithAssignee() {
        when(bugRepository.findByProjectAndAssigneeAndSprint(anyString(), anyList(), anyString())).thenReturn(bugList);
        List<Bug> result = bugService.getBugs("projectManager", "test@example.com", "Project1", Arrays.asList("dev1"), "Sprint1");
        assertEquals(bugList, result);
    }

    @Test
    void testGetBugs_ProjectManagerRole_WithoutAssignee() {
        when(bugRepository.findByProjectAndSprint(anyString(), anyString())).thenReturn(bugList);
        List<Bug> result = bugService.getBugs("projectManager", "test@example.com", "Project1", null, "Sprint1");
        assertEquals(bugList, result);
    }

    @Test
    void testGetBugs_DeveloperRole_WithAssignee() {
        when(bugRepository.findByProjectAndAssigneeAndSprint(anyString(), anyList(), anyString())).thenReturn(bugList);
        List<Bug> result = bugService.getBugs("developer", "test@example.com", "Project1", Arrays.asList("dev1"), "Sprint1");
        assertEquals(bugList, result);
    }

    @Test
    void testGetBugs_DeveloperRole_WithoutAssignee() {
        when(bugRepository.findByProjectAndSprint(anyString(), anyString())).thenReturn(bugList);
        List<Bug> result = bugService.getBugs("developer", "test@example.com", "Project1", null, "Sprint1");
        assertEquals(bugList, result);
    }

    @Test
    void testGetBugs_OtherRole() {
        when(bugRepository.findByCreatedByEmailAndProject(anyString(), anyString())).thenReturn(bugList);
        List<Bug> result = bugService.getBugs("tester", "test@example.com", "Project1", null, null);
        assertEquals(bugList, result);
    }

    @Test
    void testDeleteBug() {
        doNothing().when(bugRepository).deleteById(anyString());
        bugService.deleteBug("123");
        verify(bugRepository, times(1)).deleteById("123");
    }
}
