package com.example.bugtrackersystem.controllers;

import com.example.bugtrackersystem.services.MetricsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/metrics")
public class MetricsController {

    @Autowired
    private MetricsService metricsService;

    @PostMapping("/sprint")
    public ResponseEntity<Map<String, Object>> getSprintMetrics(@RequestBody Map<String, String> requestBody) {
        String project = requestBody.get("project");
        String sprint = requestBody.get("sprint");
        Map<String, Object> metrics = metricsService.calculateSprintMetrics(project, sprint);
        return ResponseEntity.ok(metrics);
    }
}
