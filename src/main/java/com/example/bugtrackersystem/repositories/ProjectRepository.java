package com.example.bugtrackersystem.repositories;

import com.example.bugtrackersystem.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProjectRepository extends MongoRepository<Project, String> {
    // Additional query methods can be defined here
}
