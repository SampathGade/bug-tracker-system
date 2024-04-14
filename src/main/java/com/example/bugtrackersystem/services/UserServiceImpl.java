package com.example.bugtrackersystem.services;

import org.springframework.stereotype.Service;

import com.example.bugtrackersystem.Entity.User;
import com.example.bugtrackersystem.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getUserByUserId(String userId) {
        return userRepository.findByUserId(userId);
    }

    @Override
    public User getUserByEmail(String userEmail) {
        return userRepository.findByUserEmail(userEmail);
    }
}
