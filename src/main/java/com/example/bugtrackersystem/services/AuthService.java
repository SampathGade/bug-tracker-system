package com.example.bugtrackersystem.services;

import com.example.bugtrackersystem.exceptions.EmailAlreadyInUse;
import com.example.bugtrackersystem.exceptions.InvalidCredentialsException;
import com.example.bugtrackersystem.exceptions.UsernameNotAvailableException;
import com.example.bugtrackersystem.model.User;
import com.example.bugtrackersystem.model.enums.RoleName;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService; // Assuming you have a RoleService class to manage roles

    public User login(String username, String password) {
        User user = userService.findUserByUsername(username);
        if (user == null) {
            throw new InvalidCredentialsException("Invalid username or password");
        }
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
        // Assuming "ROLE_USER" is a valid role name defined in your RoleName enum
        user.getRoles().add(roleService.findByRoleName(RoleName.ROLE_USER));
        userService.save(user);
        return user;
    }

    private void checkUsernameAvailability(String username){
        User existingUser = userService.findUserByUsername(username);
        if(existingUser != null){
            throw new UsernameNotAvailableException("Username " + username + " is not available");
        }
    }

    private void checkEmailAvailability(String email){
        User existingUser = userService.findUserByEmail(email);
        if(existingUser != null){
            throw new EmailAlreadyInUse("Email " + email + " is already in use");
        }
    }
}
