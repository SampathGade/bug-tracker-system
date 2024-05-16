package com.example.bugtrackersystem.controllers;

import com.example.bugtrackersystem.services.MetricsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class MetricsControllerTest {

    @Mock
    private MetricsService metricsService;

    @InjectMocks
    private MetricsController metricsController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetSprintMetrics_Success() {
        // Arrange
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("project", "TestProject");
        requestBody.put("sprint", "Sprint1");

        Map<String, Object> metrics = new HashMap<>();
        metrics.put("totalBugs", 10);
        metrics.put("storyPoints", 20);

        when(metricsService.calculateSprintMetrics("TestProject", "Sprint1")).thenReturn(metrics);

        // Act
        ResponseEntity<Map<String, Object>> response = metricsController.getSprintMetrics(requestBody);

        // Assert
        assertEquals(ResponseEntity.ok(metrics), response);
        verify(metricsService, times(1)).calculateSprintMetrics("TestProject", "Sprint1");
    }

    @Test
    void testGetSprintMetrics_Exception() {
        // Arrange
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("project", "TestProject");
        requestBody.put("sprint", "Sprint1");

        when(metricsService.calculateSprintMetrics("TestProject", "Sprint1")).thenThrow(new RuntimeException("Service error"));

        // Act & Assert
        try {
            metricsController.getSprintMetrics(requestBody);
        } catch (RuntimeException e) {
            assertEquals("Service error", e.getMessage());
        }

        verify(metricsService, times(1)).calculateSprintMetrics("TestProject", "Sprint1");
    }
}
