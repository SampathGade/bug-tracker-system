package com.example.bugtrackersystem.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.bugtrackersystem.entity.SprintManager;
import com.example.bugtrackersystem.entity.User;
import com.example.bugtrackersystem.repository.SprintRepository;
import com.example.bugtrackersystem.requests.LoginRequest;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/sprint")
public class SprintController {

    @Autowired
    SprintRepository sprintRepository;
    @GetMapping("/current")
    public ResponseEntity<?> getCurrentSprint() {
        try {
            SprintManager sprintManager = sprintRepository.findByCurrentSprint(true);
            return ResponseEntity.ok(sprintManager);
        } catch (Exception e) {
//            logger.error("Internal server error during login process for user: {}, error: {}", loginRequest.getEmail(), e.getMessage());
            return ResponseEntity.internalServerError().body("An internal server error occurred. Please try again.");
        }
    }
}
