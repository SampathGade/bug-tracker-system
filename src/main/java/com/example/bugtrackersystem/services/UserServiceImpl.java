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

    @Override
    public void createUserWithEmailAndRole(String userEmail, String role, String password) {
        // Hash the password (You can use bcrypt or other secure hashing algorithms)
        String hashedPassword = password;
        User newUser = new User();
        newUser.setUserEmail(userEmail);
        newUser.setRole(role);
        newUser.setPassword(hashedPassword);
        newUser.setStatus("applicant");

        // Save the new user to the database
        userRepository.save(newUser);
    }

    @Override
    public void createUserWithEmailAndRole(String userEmail, String role) {
        // Hash the password (You can use bcrypt or other secure hashing algorithms)
        String hashedPassword = "1234";
        User newUser = new User();
        newUser.setUserEmail(userEmail);
        newUser.setRole(role);
        newUser.setPassword(hashedPassword);
        newUser.setStatus("Onboarded");

        // Save the new user to the database
        userRepository.save(newUser);
        //send mail to user
    }
}
