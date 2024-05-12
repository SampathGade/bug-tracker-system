package com.example.bugtrackersystem.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.bugtrackersystem.entity.SprintManager;

public interface SprintRepository extends MongoRepository<SprintManager, String> {
    SprintManager findByCurrentSprint(Boolean currentSprint);
}
