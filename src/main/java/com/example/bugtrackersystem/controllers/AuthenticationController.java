package com.example.bugtrackersystem.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.example.bugtrackersystem.entity.User;
import com.example.bugtrackersystem.requests.LoginRequest;
import com.example.bugtrackersystem.requests.OtpVerificationRequest;
import com.example.bugtrackersystem.requests.SignUpRequest;
import com.example.bugtrackersystem.services.Authentication.AuthenticationService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/auth")
public class AuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @Autowired
    private AuthenticationService authService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        try {
            boolean isValid = authService.checkCredentials(loginRequest.getEmail(), loginRequest.getPassword());
            if (isValid) {
                authService.generateAndSendOtp(loginRequest.getEmail());
                return ResponseEntity.ok("OTP sent to your email. Please verify to log in.");
            } else {
                logger.error("Unauthorized access attempt for user: {}", loginRequest.getEmail());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: Invalid email or password.");
            }
        } catch (Exception e) {
            logger.error("Internal server error during login process for user: {}, error: {}", loginRequest.getEmail(), e.getMessage());
            return ResponseEntity.internalServerError().body("An internal server error occurred. Please try again.");
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpVerificationRequest otpRequest) {
        try {
            User user = authService.validateOtp(otpRequest.getEmail(), otpRequest.getOtp());
            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                logger.error("Unauthorized OTP attempt for user: {}", otpRequest.getEmail());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: Invalid or expired OTP.");
            }
        } catch (Exception e) {
            logger.error("Internal server error during OTP verification for user: {}, error: {}", otpRequest.getEmail(), e.getMessage());
            return ResponseEntity.internalServerError().body("An internal server error occurred. Please try again.");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<String> login(@RequestBody SignUpRequest signUpRequest) {
        try {
                authService.createUser(signUpRequest.getEmail(), signUpRequest.getPassword(),signUpRequest.getRole());
                authService.generateAndSendOtp(signUpRequest.getEmail());
                return ResponseEntity.ok("Onboarding request successful");
        } catch (Exception e) {
            logger.error("Internal server error during sing-up process for user: {}, error: {}", signUpRequest.getEmail(), e.getMessage());
            return ResponseEntity.internalServerError().body("An internal server error occurred. Please try again.");
        }
    }
}
