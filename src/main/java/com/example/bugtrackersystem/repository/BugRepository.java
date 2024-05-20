package com.example.bugtrackersystem.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.bugtrackersystem.entity.Bug;

public interface BugRepository extends MongoRepository<Bug, String> {
    List<Bug> findByProjectManager(String projectManager);

    List<Bug> findByProjectAndSprint(String project, String sprint);

    @Query("{ 'project' : ?0, 'assignee' : { $in : ?1 }, 'sprint' : ?2 }")
    List<Bug> findByProjectAndAssigneeAndSprint(String project, List<String> assignees, String sprint);

    List<Bug> findByAssignee(String assignee);

    @Query("{ 'createdBy.email' : ?0, 'project' : ?1 }")
    List<Bug> findByCreatedByEmailAndProject(String email, String project);

    Bug findByname(String name);

    @Query("{ 'status' : { $ne : ?1 }, 'sprint' : ?0 }")
    List<Bug>findBySprintAndStatus(String sprint, String status);

    List<Bug>findByAssigneeAndSprint(String sprint, String Assignee);

}
