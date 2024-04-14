package com.example.bugtrackersystem.services;

import org.springframework.stereotype.Service;

import com.example.bugtrackersystem.Entity.User;
import com.example.bugtrackersystem.repositories.UserRepository;

public interface UserService {
    User getUserByUserId(String userId);
    User getUserByEmail(String userEmail);
    void createUserWithEmailAndRole(String userEmail, String role, String password);
}

