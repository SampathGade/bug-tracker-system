package com.example.bugtrackersystem.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.bugtrackersystem.Entity.User;
import com.example.bugtrackersystem.requests.AdminSignUpRequest;
import com.example.bugtrackersystem.requests.LoginRequest;
import com.example.bugtrackersystem.requests.SignUpRequest;
import com.example.bugtrackersystem.services.UserService;
import com.example.bugtrackersystem.services.UserServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody SignUpRequest signUpRequest) {
        try {
            userService.createUserWithEmailAndRole(signUpRequest.getUserEmail(), signUpRequest.getRole(), signUpRequest.getPassword());
            return new ResponseEntity<>("User signed up successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to sign up user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        String userEmail = loginRequest.getUserEmail();
        String password = loginRequest.getPassword();

        User user = userService.getUserByEmail(userEmail);
        if (user != null && user.getPassword().equals(password)) {
            return ResponseEntity.ok(user); // Authentication successful
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials"); // Authentication failed
        }
    }

    @PostMapping("/signupByAdmin")
    public ResponseEntity<String> adminSignUp(@RequestBody AdminSignUpRequest adminSignUpRequest) {
        try {
            String userEmail = adminSignUpRequest.getUserEmail();
            String role = adminSignUpRequest.getRole();

            userService.createUserWithEmailAndRole(userEmail, role);

            return ResponseEntity.ok("Completed admin onbaording ");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error completing admin sign up");
        }


    }
}
