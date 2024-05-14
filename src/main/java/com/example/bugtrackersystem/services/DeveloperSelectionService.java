package com.example.bugtrackersystem.services;

import com.example.bugtrackersystem.entity.Bug;
import com.example.bugtrackersystem.entity.Performance;
import com.example.bugtrackersystem.entity.PerformanceValue;
import com.example.bugtrackersystem.entity.Project;
import com.example.bugtrackersystem.entity.User;
import com.example.bugtrackersystem.repository.BugRepository;
import com.example.bugtrackersystem.repository.ProjectRepository;
import com.example.bugtrackersystem.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class DeveloperSelectionService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BugRepository bugRepository;

    @Autowired
    private UserRepository userRepository;

    public String findBestFitDeveloper(String sprint, String projectId) {
        // Retrieve the project by ID
        Project project = projectRepository.findByName(projectId);
        if (project == null) {
            throw new IllegalArgumentException("Project not found");
        }

        List<String> developers = project.getDevelopers();

        String bestDeveloper = null;
        double bestPerformance = -1;

        for (String developer : developers) {
            List<Bug> assignedBugs = bugRepository.findByAssigneeAndSprint(developer, sprint);
            int totalStoryPoints = assignedBugs.stream().mapToInt(Bug::getStoryPoints).sum();

            double pastPerformancePercentage = 0;
            double lastPerformancePercentage = 0;

            if (totalStoryPoints < 10) {
                User user = userRepository.findByEmail(developer);
                Performance performance = null;
                if (user != null) {
                    // Retrieve performance details
                    performance = user.getPerformances();
                }

                if (performance != null) {
                    if (performance.getPastPerformance() != null) {
                        pastPerformancePercentage = calculatePerformancePercentage(performance.getPastPerformance());
                    }
                    if (performance.getLastPerformance() != null) {
                        lastPerformancePercentage = calculatePerformancePercentage(performance.getLastPerformance());
                    }
                }


                double finalPerformance = (lastPerformancePercentage * 0.7) + (pastPerformancePercentage * 0.3);

                if (finalPerformance > bestPerformance) {
                    bestPerformance = finalPerformance;
                    bestDeveloper = developer;
                }
            }
        }

        return bestDeveloper;
    }

    private double calculatePerformancePercentage(PerformanceValue performanceValue) {
        if (performanceValue == null) {
            return 0;
        }
        int total = performanceValue.getTotal() == null ? 0 : performanceValue.getTotal();
        int completed = performanceValue.getCompleted() == null ? 0 : performanceValue.getCompleted();
        return total == 0 ? 0 : ((double) completed / total) * 100;
    }
}
