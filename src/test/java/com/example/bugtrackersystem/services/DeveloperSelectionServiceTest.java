package com.example.bugtrackersystem.services;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.example.bugtrackersystem.entity.*;
import com.example.bugtrackersystem.repository.BugRepository;
import com.example.bugtrackersystem.repository.ProjectRepository;
import com.example.bugtrackersystem.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.ArrayList;
import java.util.List;

public class DeveloperSelectionServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private BugRepository bugRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private DeveloperSelectionService developerSelectionService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindBestFitDeveloper_ProjectNotFound() {
        when(projectRepository.findByName(anyString())).thenReturn(null);

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            developerSelectionService.findBestFitDeveloper("sprint1", "projectId");
        });

        assertEquals("Project not found", exception.getMessage());
    }

    @Test
    public void testFindBestFitDeveloper_NoDevelopers() {
        Project project = new Project();
        project.setDevelopers(new ArrayList<>());
        when(projectRepository.findByName(anyString())).thenReturn(project);

        String result = developerSelectionService.findBestFitDeveloper("sprint1", "projectId");
        assertNull(result);
    }

    @Test
    public void testFindBestFitDeveloper_AllDevelopersHaveHighStoryPoints() {
        Project project = new Project();
        List<String> developers = new ArrayList<>();
        developers.add("developer1");
        project.setDevelopers(developers);

        when(projectRepository.findByName(anyString())).thenReturn(project);

        List<Bug> bugs = new ArrayList<>();
        Bug bug = new Bug();
        bug.setStoryPoints(10);
        bugs.add(bug);

        when(bugRepository.findByAssigneeAndSprint(anyString(), anyString())).thenReturn(bugs);

        String result = developerSelectionService.findBestFitDeveloper("sprint1", "projectId");
        assertNull(result);
    }

    @Test
    public void testFindBestFitDeveloper_BestDeveloperFound() {
        Project project = new Project();
        List<String> developers = new ArrayList<>();
        developers.add("developer1");
        developers.add("developer2");
        project.setDevelopers(developers);

        when(projectRepository.findByName(anyString())).thenReturn(project);

        List<Bug> bugs1 = new ArrayList<>();
        Bug bug1 = new Bug();
        bug1.setStoryPoints(5);
        bugs1.add(bug1);

        List<Bug> bugs2 = new ArrayList<>();
        Bug bug2 = new Bug();
        bug2.setStoryPoints(4);
        bugs2.add(bug2);

        when(bugRepository.findByAssigneeAndSprint("developer1", "sprint1")).thenReturn(bugs1);
        when(bugRepository.findByAssigneeAndSprint("developer2", "sprint1")).thenReturn(bugs2);

        User user1 = new User();
        Performance performance1 = new Performance();
        PerformanceValue pastPerformance1 = new PerformanceValue();
        pastPerformance1.setCompleted(8);
        pastPerformance1.setTotal(10);
        PerformanceValue lastPerformance1 = new PerformanceValue();
        lastPerformance1.setCompleted(6);
        lastPerformance1.setTotal(8);
        performance1.setPastPerformance(pastPerformance1);
        performance1.setLastPerformance(lastPerformance1);
        user1.setPerformances(performance1);

        when(userRepository.findByEmail("developer1")).thenReturn(user1);

        User user2 = new User();
        Performance performance2 = new Performance();
        PerformanceValue pastPerformance2 = new PerformanceValue();
        pastPerformance2.setCompleted(4);
        pastPerformance2.setTotal(5);
        PerformanceValue lastPerformance2 = new PerformanceValue();
        lastPerformance2.setCompleted(3);
        lastPerformance2.setTotal(5);
        performance2.setPastPerformance(pastPerformance2);
        performance2.setLastPerformance(lastPerformance2);
        user2.setPerformances(performance2);

        when(userRepository.findByEmail("developer2")).thenReturn(user2);

        String result = developerSelectionService.findBestFitDeveloper("sprint1", "projectId");
        assertEquals("developer1", result);
    }

    @Test
    public void testFindBestFitDeveloper_DeveloperWithLowStoryPointsAndNoPerformance() {
        Project project = new Project();
        List<String> developers = new ArrayList<>();
        developers.add("developer1");
        project.setDevelopers(developers);

        when(projectRepository.findByName(anyString())).thenReturn(project);

        List<Bug> bugs = new ArrayList<>();
        Bug bug = new Bug();
        bug.setStoryPoints(5);
        bugs.add(bug);

        when(bugRepository.findByAssigneeAndSprint(anyString(), anyString())).thenReturn(bugs);

        User user = new User();
        user.setPerformances(null);

        when(userRepository.findByEmail("developer1")).thenReturn(user);

        String result = developerSelectionService.findBestFitDeveloper("sprint1", "projectId");
        assertEquals("developer1", result);
    }

    @Test
    public void testCalculatePerformancePercentage_NullPerformanceValue() {
        double result = developerSelectionService.calculatePerformancePercentage(null);
        assertEquals(0, result);
    }

    @Test
    public void testCalculatePerformancePercentage_ValidPerformanceValue() {
        PerformanceValue performanceValue = new PerformanceValue();
        performanceValue.setTotal(10);
        performanceValue.setCompleted(5);
        double result = developerSelectionService.calculatePerformancePercentage(performanceValue);
        assertEquals(50, result);
    }

    @Test
    public void testCalculatePerformancePercentage_TotalZero() {
        PerformanceValue performanceValue = new PerformanceValue();
        performanceValue.setTotal(0);
        performanceValue.setCompleted(5);
        double result = developerSelectionService.calculatePerformancePercentage(performanceValue);
        assertEquals(0, result);
    }
}
