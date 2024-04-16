package com.example.bugtrackersystem.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.bugtrackersystem.entity.Bug;

public interface BugRepository extends MongoRepository<Bug, String> {
    List<Bug> findByProjectManager(String projectManager);

    List<Bug> findByAssignee(String assignee);

    List<Bug> findByCreatedBy(String createdBy);

}
