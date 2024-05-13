package com.example.bugtrackersystem.services;

import com.example.bugtrackersystem.entity.Bug;
import com.example.bugtrackersystem.repository.BugRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MetricsService {

    @Autowired
    private BugRepository bugRepository;

    public Map<String, Object> calculateSprintMetrics(String project, String sprint) {
        List<Bug> bugs = bugRepository.findByProjectAndSprint(project, sprint);
        Map<String, Integer> statusCount = new HashMap<>();
        Map<String, Map<String, Integer>> assigneeMetrics = new HashMap<>();

        for (Bug bug : bugs) {
            String status = bug.getStatus();
            Integer storyPoints = bug.getStoryPoints() == null ? 0 : bug.getStoryPoints();

            statusCount.merge(status, storyPoints, Integer::sum);

            assigneeMetrics.putIfAbsent(bug.getAssignee(), new HashMap<>());
            Map<String, Integer> assigneeData = assigneeMetrics.get(bug.getAssignee());
            assigneeData.merge("totalBugs", 1, Integer::sum);
            assigneeData.merge("totalStoryPoints", storyPoints, Integer::sum);
            assigneeData.merge(status, storyPoints, Integer::sum);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("statusCount", statusCount);
        result.put("assigneeMetrics", assigneeMetrics);
        return result;
    }
}
