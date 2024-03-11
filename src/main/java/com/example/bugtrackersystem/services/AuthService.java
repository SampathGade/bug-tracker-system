package com.example.bugtrackersystem.services;

import com.example.bugtrackersystem.exceptions.EmailAlreadyInUse;
import com.example.bugtrackersystem.exceptions.InvalidCredentialsException;
import com.example.bugtrackersystem.exceptions.UsernameNotAvailableException;
import com.example.bugtrackersystem.model.User;
import com.example.bugtrackersystem.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new InvalidCredentialsException("Invalid username or password"));
        if (passwordEncoder.matches(password, user.getPassword())) {
            return user;
        } else {
            throw new InvalidCredentialsException("Invalid username or password");
        }
    }

    public User register(User user){
        checkUsernameAvailability(user.getUsername());
        checkEmailAvailability(user.getEmail());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return user;
    }

    private void checkUsernameAvailability(String username){
        if(userRepository.findByUsername(username).isPresent()){
            throw new UsernameNotAvailableException("Username " + username + " is not available");
        }
    }

    private void checkEmailAvailability(String email){
        if(userRepository.findByEmail(email).isPresent()){
            throw new EmailAlreadyInUse("Email " + email + " is already in use");
        }
    }
}
