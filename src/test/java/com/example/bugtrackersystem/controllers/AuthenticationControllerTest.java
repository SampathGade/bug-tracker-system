package com.example.bugtrackersystem.controllers;

import java.util.ArrayList;
import java.util.List;

import com.example.bugtrackersystem.entity.User;
import com.example.bugtrackersystem.requests.*;
import com.example.bugtrackersystem.services.Authentication.AuthenticationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class AuthenticationControllerTest {

    @Mock
    private AuthenticationService authService;

    @InjectMocks
    private AuthenticationController authController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLoginSuccess() {
        LoginRequest request = new LoginRequest();
        request.setEmail("test@example.com");
        request.setPassword("password");
        request.setIp("127.0.0.1");

        when(authService.checkCredentials(anyString(), anyString())).thenReturn(true);
        when(authService.checkSession(anyString(), anyString())).thenReturn(null);
        doNothing().when(authService).createSession(anyString(), anyString());
        doNothing().when(authService).generateAndSendOtp(anyString());

        ResponseEntity<?> response = authController.login(request);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("OTP sent to your email. Please verify to log in.", response.getBody());
    }

    @Test
    void testLoginSessionExists() {
        LoginRequest request = new LoginRequest();
        request.setEmail("test@example.com");
        request.setPassword("password");
        request.setIp("127.0.0.1");

        User sessionUser = new User();
        sessionUser.setEmail("test@example.com");

        when(authService.checkCredentials(anyString(), anyString())).thenReturn(true);
        when(authService.checkSession(anyString(), anyString())).thenReturn(sessionUser);

        ResponseEntity<?> response = authController.login(request);
        assertEquals(HttpStatus.MULTI_STATUS, response.getStatusCode());
        assertEquals(sessionUser, response.getBody());
    }

    @Test
    void testLoginInvalidCredentials() {
        LoginRequest request = new LoginRequest();
        request.setEmail("test@example.com");
        request.setPassword("wrongpassword");

        when(authService.checkCredentials(anyString(), anyString())).thenReturn(false);

        ResponseEntity<?> response = authController.login(request);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Unauthorized: Invalid email or password.", response.getBody());
    }

    @Test
    void testLoginException() {
        LoginRequest request = new LoginRequest();
        request.setEmail("test@example.com");
        request.setPassword("password");

        when(authService.checkCredentials(anyString(), anyString())).thenThrow(new RuntimeException("Error"));

        ResponseEntity<?> response = authController.login(request);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("An internal server error occurred. Please try again.", response.getBody());
    }

    @Test
    void testVerifyOtpSuccess() {
        OtpVerificationRequest request = new OtpVerificationRequest();
        request.setEmail("test@example.com");
        request.setOtp("123456");
        request.setIp("127.0.0.1");

        User user = new User();
        user.setEmail("test@example.com");

        when(authService.validateOtp(anyString(), anyString(), anyString())).thenReturn(user);

        ResponseEntity<?> response = authController.verifyOtp(request);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
    }

    @Test
    void testVerifyOtpInvalid() {
        OtpVerificationRequest request = new OtpVerificationRequest();
        request.setEmail("test@example.com");
        request.setOtp("123456");

        when(authService.validateOtp(anyString(), anyString(), anyString())).thenReturn(null);

        ResponseEntity<?> response = authController.verifyOtp(request);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Unauthorized: Invalid or expired OTP.", response.getBody());
    }

    @Test
    void testVerifyOtpException() {
        OtpVerificationRequest request = new OtpVerificationRequest();
        request.setEmail("test@example.com");
        request.setOtp("123456");

        when(authService.validateOtp(anyString(), anyString(), any())).thenThrow(new RuntimeException("Error"));

        ResponseEntity<?> response = authController.verifyOtp(request);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("An internal server error occurred. Please try again.", response.getBody());
    }

    @Test
    void testValidEmailSuccess() {
        SignUpRequest request = new SignUpRequest();
        request.setEmail("test@example.com");

        when(authService.isDuplicateUser(anyString())).thenReturn(false);
        doNothing().when(authService).generateAndSendOtp(anyString());

        ResponseEntity<String> response = authController.validEmail(request);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Email validating successful", response.getBody());
    }

    @Test
    void testValidEmailDuplicate() {
        SignUpRequest request = new SignUpRequest();
        request.setEmail("test@example.com");

        when(authService.isDuplicateUser(anyString())).thenReturn(true);

        ResponseEntity<String> response = authController.validEmail(request);
        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("Onboarding request pending or already an user", response.getBody());
    }

    @Test
    void testValidEmailException() {
        SignUpRequest request = new SignUpRequest();
        request.setEmail("test@example.com");

        when(authService.isDuplicateUser(anyString())).thenThrow(new RuntimeException("Error"));

        ResponseEntity<String> response = authController.validEmail(request);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("An internal server error occurred. Please try again.", response.getBody());
    }

    @Test
    void testValidEmailPasswordSuccess() {
        SignUpRequest request = new SignUpRequest();
        request.setEmail("test@example.com");

        when(authService.isDuplicateUser(anyString())).thenReturn(true);
        doNothing().when(authService).generateAndSendOtp(anyString());

        ResponseEntity<String> response = authController.validEmailPassword(request);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Email validating successful", response.getBody());
    }

    @Test
    void testValidEmailPasswordNotDuplicate() {
        SignUpRequest request = new SignUpRequest();
        request.setEmail("test@example.com");

        when(authService.isDuplicateUser(anyString())).thenReturn(false);

        ResponseEntity<String> response = authController.validEmailPassword(request);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Onboarding request pending or already an user", response.getBody());
    }

    @Test
    void testValidEmailPasswordException() {
        SignUpRequest request = new SignUpRequest();
        request.setEmail("test@example.com");

        when(authService.isDuplicateUser(anyString())).thenThrow(new RuntimeException("Error"));

        ResponseEntity<String> response = authController.validEmailPassword(request);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("An internal server error occurred. Please try again.", response.getBody());
    }

    @Test
    void testCreateUserSuccess() {
        SignUpRequest request = new SignUpRequest();
        request.setEmail("test@example.com");
        request.setOtp("123456");
        request.setPassword("password");
        request.setRole("Developer");

        User user = new User();
        user.setEmail("test@example.com");

        when(authService.validateOtp(anyString(), anyString(), any())).thenReturn(user);
        doNothing().when(authService).createUser(anyString(), anyString(), anyString(),anyString(),anyString());

        ResponseEntity<?> response = authController.createUser(request);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("user created successfully", response.getBody());
    }

    @Test
    void testCreateUserInvalidOtp() {
        SignUpRequest request = new SignUpRequest();
        request.setEmail("test@example.com");
        request.setOtp("123456");
        request.setPassword("password");

        when(authService.validateOtp(anyString(), anyString(), any())).thenReturn(null);

        ResponseEntity<?> response = authController.createUser(request);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Unauthorized: Invalid or expired OTP.", response.getBody());
    }

    @Test
    void testCreateUserException() {
        SignUpRequest request = new SignUpRequest();
        request.setEmail("test@example.com");
        request.setOtp("123456");
        request.setPassword("password");

        when(authService.validateOtp(anyString(), anyString(), any())).thenThrow(new RuntimeException("Error"));

        ResponseEntity<?> response = authController.createUser(request);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("An internal server error occurred. Please try again.", response.getBody());
    }

    @Test
    void testResetPasswordSuccess() {
        SignUpRequest request = new SignUpRequest();
        request.setEmail("test@example.com");
        request.setOtp("123456");
        request.setPassword("newpassword");

        User user = new User();
        user.setEmail("test@example.com");

        when(authService.validateOtp(anyString(), anyString(), any())).thenReturn(user);
        doNothing().when(authService).resetPassword(anyString(), anyString());

        ResponseEntity<?> response = authController.resetPassword(request);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("user created successfully", response.getBody());
    }

    @Test
    void testResetPasswordInvalidOtp() {
        SignUpRequest request = new SignUpRequest();
        request.setEmail("test@example.com");
        request.setOtp("123456");
        request.setPassword("newpassword");

        when(authService.validateOtp(anyString(), anyString(), any())).thenReturn(null);

        ResponseEntity<?> response = authController.resetPassword(request);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Unauthorized: Invalid or expired OTP.", response.getBody());
    }

    @Test
    void testResetPasswordException() {
        SignUpRequest request = new SignUpRequest();
        request.setEmail("test@example.com");
        request.setOtp("123456");
        request.setPassword("newpassword");

        when(authService.validateOtp(anyString(), anyString(), any())).thenThrow(new RuntimeException("Error"));

        ResponseEntity<?> response = authController.resetPassword(request);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("An internal server error occurred. Please try again.", response.getBody());
    }

    @Test
    void testPendingSuccess() {
        when(authService.getOnboardingPendingUsers()).thenReturn(new ArrayList<>());

        ResponseEntity<?> response = authController.pending();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody() instanceof List);
    }

    @Test
    void testPendingException() {
        when(authService.getOnboardingPendingUsers()).thenThrow(new RuntimeException("Error"));

        ResponseEntity<?> response = authController.pending();
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("An internal server error occurred. Please try again.", response.getBody());
    }

    @Test
    void testProcessRequestsSuccess() {
        UpdateStatusRequest request = new UpdateStatusRequest();
        request.setEmail("test@example.com");
        request.setRole("Developer");
        request.setProjectManager("manager@example.com");
        request.setStatus("Approved");

        doNothing().when(authService).updateRequestStatus(anyString(), anyString(), anyString(), anyString());

        ResponseEntity<?> response = authController.processRequests(request);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Pending request processed", response.getBody());
    }

    @Test
    void testProcessRequestsException() {
        UpdateStatusRequest request = new UpdateStatusRequest();
        request.setEmail("test@example.com");
        request.setRole("Developer");
        request.setProjectManager("manager@example.com");
        request.setStatus("Approved");

        doThrow(new RuntimeException("Error")).when(authService).updateRequestStatus(anyString(), anyString(), anyString(), anyString());

        ResponseEntity<?> response = authController.processRequests(request);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("An internal server error occurred. Please try again.", response.getBody());
    }

    @Test
    void testVerifyEmailPasswordSuccess() {
        SignUpRequest request = new SignUpRequest();
        request.setEmail("test@example.com");

        when(authService.isDuplicateUser(anyString())).thenReturn(true);
        doNothing().when(authService).generateAndSendOtp(anyString());

        ResponseEntity<String> response = authController.validEmailPassword(request);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Email validating successful", response.getBody());
    }

    @Test
    void testVerifyEmailPasswordNotDuplicate() {
        SignUpRequest request = new SignUpRequest();
        request.setEmail("test@example.com");

        when(authService.isDuplicateUser(anyString())).thenReturn(false);

        ResponseEntity<String> response = authController.validEmailPassword(request);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Onboarding request pending or already an user", response.getBody());
    }

    @Test
    void testVerifyEmailPasswordException() {
        SignUpRequest request = new SignUpRequest();
        request.setEmail("test@example.com");

        when(authService.isDuplicateUser(anyString())).thenThrow(new RuntimeException("Error"));

        ResponseEntity<String> response = authController.validEmailPassword(request);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("An internal server error occurred. Please try again.", response.getBody());
    }
}
