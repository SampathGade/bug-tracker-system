package com.example.bugtrackersystem.services;

import com.example.bugtrackersystem.entity.Bug;
import com.example.bugtrackersystem.repository.BugRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MetricsServiceTest {

    @Mock
    private BugRepository bugRepository;

    @InjectMocks
    private MetricsService metricsService;

    private Bug bug1;
    private Bug bug2;

    @BeforeEach
    void setUp() {
        bug1 = new Bug();
        bug1.setStatus("To Do");
        bug1.setStoryPoints(3);
        bug1.setAssignee("John");

        bug2 = new Bug();
        bug2.setStatus("In Progress");
        bug2.setStoryPoints(5);
        bug2.setAssignee("Jane");
    }

    @Test
    void calculateSprintMetrics_AllConditions() {
        List<Bug> bugs = Arrays.asList(bug1, bug2);
        when(bugRepository.findByProjectAndSprint("Project1", "Sprint1")).thenReturn(bugs);

        Map<String, Object> result = metricsService.calculateSprintMetrics("Project1", "Sprint1");

        Map<String, Integer> expectedStatusCount = new HashMap<>();
        expectedStatusCount.put("To Do", 3);
        expectedStatusCount.put("In Progress", 5);

        Map<String, Map<String, Integer>> expectedAssigneeMetrics = new HashMap<>();
        Map<String, Integer> johnMetrics = new HashMap<>();
        johnMetrics.put("totalBugs", 1);
        johnMetrics.put("totalStoryPoints", 3);
        johnMetrics.put("To Do", 3);
        expectedAssigneeMetrics.put("John", johnMetrics);

        Map<String, Integer> janeMetrics = new HashMap<>();
        janeMetrics.put("totalBugs", 1);
        janeMetrics.put("totalStoryPoints", 5);
        janeMetrics.put("In Progress", 5);
        expectedAssigneeMetrics.put("Jane", janeMetrics);

        assertEquals(expectedStatusCount, result.get("statusCount"));
        assertEquals(expectedAssigneeMetrics, result.get("assigneeMetrics"));
    }

    @Test
    void calculateSprintMetrics_EmptyBugsList() {
        when(bugRepository.findByProjectAndSprint("Project1", "Sprint1")).thenReturn(Arrays.asList());

        Map<String, Object> result = metricsService.calculateSprintMetrics("Project1", "Sprint1");

        Map<String, Integer> expectedStatusCount = new HashMap<>();
        Map<String, Map<String, Integer>> expectedAssigneeMetrics = new HashMap<>();

        assertEquals(expectedStatusCount, result.get("statusCount"));
        assertEquals(expectedAssigneeMetrics, result.get("assigneeMetrics"));
    }

    @Test
    void calculateSprintMetrics_NullStoryPoints() {
        Bug bug3 = new Bug();
        bug3.setStatus("Done");
        bug3.setStoryPoints(null);
        bug3.setAssignee("Doe");

        List<Bug> bugs = Arrays.asList(bug3);
        when(bugRepository.findByProjectAndSprint("Project1", "Sprint1")).thenReturn(bugs);

        Map<String, Object> result = metricsService.calculateSprintMetrics("Project1", "Sprint1");

        Map<String, Integer> expectedStatusCount = new HashMap<>();
        expectedStatusCount.put("Done", 0);

        Map<String, Map<String, Integer>> expectedAssigneeMetrics = new HashMap<>();
        Map<String, Integer> doeMetrics = new HashMap<>();
        doeMetrics.put("totalBugs", 1);
        doeMetrics.put("totalStoryPoints", 0);
        doeMetrics.put("Done", 0);
        expectedAssigneeMetrics.put("Doe", doeMetrics);

        assertEquals(expectedStatusCount, result.get("statusCount"));
        assertEquals(expectedAssigneeMetrics, result.get("assigneeMetrics"));
    }
}
