package com.example.bugtrackersystem.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bugtrackersystem.entity.Bug;
import com.example.bugtrackersystem.repository.BugRepository;

@Service
public class BugService {
    @Autowired
    BugRepository bugRepository;

    public List<Bug> getBugs(String role , String email, String project, List<String> assignee, String sprint) {
        if("admin".equalsIgnoreCase(role)) {
            if(assignee != null && assignee.size()>0) {
                return bugRepository.findByProjectAndAssigneeAndSprint(project, assignee, sprint);
            } else {
               return bugRepository.findByProjectAndSprint(project, sprint);
            }
        } else if ("projectManager".equalsIgnoreCase(role)) {
            if(assignee != null && assignee.size()>0) {
                return bugRepository.findByProjectAndAssigneeAndSprint(project, assignee, sprint);
            } else {
                return bugRepository.findByProjectAndSprint(project, sprint);
            }
        } else if ("developer".equalsIgnoreCase(role)) {
            if(assignee != null && assignee.size()>0) {
                return bugRepository.findByProjectAndAssigneeAndSprint(project, assignee, sprint);
            } else {
                return bugRepository.findByProjectAndSprint(project, sprint);
            }
        } else {
            return bugRepository.findByCreatedBy(email);
        }
    }

    public void deleteBug(String bugId) {
        bugRepository.deleteById(bugId);
    }
}
