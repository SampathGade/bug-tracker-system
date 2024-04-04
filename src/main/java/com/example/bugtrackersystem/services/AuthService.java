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

        // Compare the provided plain-text password with the encoded password stored in the database
        if (passwordEncoder.matches(password, user.getPassword())) {
            return user;
        } else {
            throw new InvalidCredentialsException("Invalid username or password");
        }
    }



    public User register(User user, PasswordEncoder passwordEncoder) {
        checkUsernameAvailability(user.getUsername());
        checkEmailAvailability(user.getEmail());

        // Encode the password before saving
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        // Assuming "ROLE_USER" is a valid role name defined in your RoleName enum
        user.getRoles().add(roleService.findByRoleName(RoleName.ROLE_USER));
        userService.save(user); // Assuming userService.save() internally calls the save method

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
