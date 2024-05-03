package com.example.bugtrackersystem.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.bugtrackersystem.entity.Bug;

public interface BugRepository extends MongoRepository<Bug, String> {
    List<Bug> findByProjectManager(String projectManager);

    List<Bug> findByProject(String project);

    @Query("{ 'project' : ?0, 'assignee' : { $in : ?1 } }")
    List<Bug> findByProjectAndAssigneeIn(String project, List<String> assignees);

    List<Bug> findByAssignee(String assignee);

    List<Bug> findByCreatedBy(String createdBy);

    Bug findByname(String name);

}
