package com.example.bugtrackersystem.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.bugtrackersystem.entity.Project;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {
    List<Project> findByProjectManager(String projectManager);

    List<Project> findByUsers(String user);

    Project findByName(String name);
}
