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
import com.example.bugtrackersystem.requests.UpdateStatusRequest;
import com.example.bugtrackersystem.services.Authentication.AuthenticationService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/auth")
public class AuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @Autowired
    private AuthenticationService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            boolean isValid = authService.checkCredentials(loginRequest.getEmail(), loginRequest.getPassword());
            if (isValid) {
                User sessionExists = authService.checkSession(loginRequest.getEmail(), loginRequest.getIp());
                if(sessionExists==null) {
                    authService.createSession(loginRequest.getEmail(), loginRequest.getIp());
                    authService.generateAndSendOtp(loginRequest.getEmail());
                    return ResponseEntity.ok("OTP sent to your email. Please verify to log in.");
                } else {
                    return ResponseEntity.status(HttpStatus.MULTI_STATUS).body(sessionExists);
                }
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
            User user = authService.validateOtp(otpRequest.getEmail(), otpRequest.getOtp(), otpRequest.getIp());
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

    @PostMapping("/verify-email")
    public ResponseEntity<String> validEmail(@RequestBody SignUpRequest signUpRequest) {
        try {
                boolean isDuplicate = authService.isDuplicateUser(signUpRequest.getEmail());
                if(!isDuplicate) {
                    authService.generateAndSendOtp(signUpRequest.getEmail());
                    return ResponseEntity.ok("Email validating successful");
                }
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Onboarding request pending or already an user");
        } catch (Exception e) {
            logger.error("Internal server error during sing-up process for user: {}, error: {}", signUpRequest.getEmail(), e.getMessage());
            return ResponseEntity.internalServerError().body("An internal server error occurred. Please try again.");
        }
    }
    @PostMapping("/verify-email-password")
    public ResponseEntity<String> validEmailPassword(@RequestBody SignUpRequest signUpRequest) {
        try {
            boolean isDuplicate = authService.isDuplicateUser(signUpRequest.getEmail());
            if(isDuplicate) {
                authService.generateAndSendOtp(signUpRequest.getEmail());
                return ResponseEntity.ok("Email validating successful");
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Onboarding request pending or already an user");
        } catch (Exception e) {
            logger.error("Internal server error during sing-up process for user: {}, error: {}", signUpRequest.getEmail(), e.getMessage());
            return ResponseEntity.internalServerError().body("An internal server error occurred. Please try again.");
        }
    }

    @PostMapping("/create-user")
    public ResponseEntity<?> createUser(@RequestBody SignUpRequest signUpRequest) {
        try {
            User user = authService.validateOtp(signUpRequest.getEmail(), signUpRequest.getOtp(), null);
            if (user != null) {
                authService.createUser(signUpRequest.getEmail(),
                        signUpRequest.getPassword(), signUpRequest.getRole(), signUpRequest.getFirstName(),
                        signUpRequest.getLastName());
                return ResponseEntity.ok("user created successfully");
            } else {
                logger.error("Unauthorized OTP attempt for user: {}", signUpRequest.getEmail());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: Invalid or expired OTP.");
            }

        } catch (Exception e) {
            logger.error("Internal server error during sing-up process for user: {}, error: {}", signUpRequest.getEmail(), e.getMessage());
            return ResponseEntity.internalServerError().body("An internal server error occurred. Please try again.");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody SignUpRequest signUpRequest) {
        try {
            User user = authService.validateOtp(signUpRequest.getEmail(), signUpRequest.getOtp(), null);
            if (user != null) {
                authService.resetPassword(signUpRequest.getEmail(), signUpRequest.getPassword());
                return ResponseEntity.ok("user created successfully");
            } else {
                logger.error("Unauthorized OTP attempt for user: {}", signUpRequest.getEmail());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: Invalid or expired OTP.");
            }

        } catch (Exception e) {
            logger.error("Internal server error during sing-up process for user: {}, error: {}", signUpRequest.getEmail(), e.getMessage());
            return ResponseEntity.internalServerError().body("An internal server error occurred. Please try again.");
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<?> pending() {
        try {
            return ResponseEntity.ok(authService.getOnboardingPendingUsers());
        } catch (Exception e) {
            logger.error("Internal server error during getting pending requests , error: {}",e.getMessage());
            return ResponseEntity.internalServerError().body("An internal server error occurred. Please try again.");
        }
    }

    @PostMapping("/updateStatus")
    public ResponseEntity<?> processRequests(@RequestBody UpdateStatusRequest updateStatusRequest) {
        try{
            authService.updateRequestStatus(updateStatusRequest.getEmail(), updateStatusRequest.getRole(), updateStatusRequest.getProjectManager(), updateStatusRequest.getStatus());
            return ResponseEntity.ok().body("Pending request processed");
        } catch (Exception e){
            logger.error(e.getMessage());
            return ResponseEntity.internalServerError().body("An internal server error occurred. Please try again.");
        }

    }
}
