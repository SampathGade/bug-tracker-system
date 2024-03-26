package com.example.bugtrackersystem.controllers;


import com.example.bugtrackersystem.model.User;
import com.example.bugtrackersystem.requests.LoginRequest;
import com.example.bugtrackersystem.requests.RegisterRequest;
import com.example.bugtrackersystem.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        User user = authService.login(loginRequest.getUsername(), loginRequest.getPassword());
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Application in Good Health");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest){
        User user = authService.register(new User(registerRequest.getUsername(),
                registerRequest.getPassword(),
                registerRequest.getEmail()));
        return ResponseEntity.ok(user);
    }
}
