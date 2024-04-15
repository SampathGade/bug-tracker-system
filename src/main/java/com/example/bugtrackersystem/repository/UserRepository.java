package com.example.bugtrackersystem.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.bugtrackersystem.entity.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
}

