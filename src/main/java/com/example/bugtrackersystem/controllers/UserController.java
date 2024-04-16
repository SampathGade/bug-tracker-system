package com.example.bugtrackersystem.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.bugtrackersystem.entity.User;
import com.example.bugtrackersystem.requests.GetUsersRequest;
import com.example.bugtrackersystem.requests.LoginRequest;
import com.example.bugtrackersystem.requests.UpdateUserRequest;
import com.example.bugtrackersystem.services.Authentication.AuthenticationService;
import com.example.bugtrackersystem.services.User.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/getDetails")
    public ResponseEntity<?> getUserDetails(@RequestBody GetUsersRequest getUsersRequest) {
        try {
            List<User> userList = userService.getUserDetails(getUsersRequest.getRole(), getUsersRequest.getEmail());
            return ResponseEntity.ok().body(userList);
        } catch (Exception e) {
            logger.error("Internal server error during getting userDetails , error: {}", e.getMessage());
            return ResponseEntity.internalServerError().body("An internal server error occurred. Please try again.");
        }
    }

    @PostMapping("/updateDetails")
    public ResponseEntity<?> updateUserDetails(@RequestBody UpdateUserRequest updateUserRequest) {
        try {
            userService.updateUserDetails(updateUserRequest.getEmail(), updateUserRequest.getRole(), updateUserRequest.getProjectManager());
            return ResponseEntity.ok().body("user updated successfully ");
        } catch (Exception e) {
            logger.error("Internal server error during updating  userDetails , error: {}", e.getMessage());
            return ResponseEntity.internalServerError().body("An internal server error occurred. Please try again.");
        }
    }

    @GetMapping("/getProjectManagers")
    public ResponseEntity<?> getProjectManagers() {
        try {
            List<User> projectManager = userService.getProjectManagers();
            return ResponseEntity.ok().body(projectManager);
        } catch (Exception e) {
            logger.error("Internal server error during getting projectManagers , error: {}", e.getMessage());
            return ResponseEntity.internalServerError().body("An internal server error occurred. Please try again.");
        }
    }
}
