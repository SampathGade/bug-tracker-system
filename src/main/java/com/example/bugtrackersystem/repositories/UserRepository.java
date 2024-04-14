package com.example.bugtrackersystem.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.bugtrackersystem.Entity.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUserId(String userId);

    User findByUserEmail(String  userEmail);

    List<String> findUserEmailByRole(String role);
}
