package com.example.bugtrackersystem.services.Authentication;

import com.example.bugtrackersystem.entity.Session;
import com.example.bugtrackersystem.entity.User;
import com.example.bugtrackersystem.repository.UserRepository;
import com.example.bugtrackersystem.services.EmailSender.EmailSender;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private EmailSender emailService;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthenticationService authenticationService;

    private User user;
    private Session session;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password");
        user.setStatus("Onboarded");
        user.setOtp("123456");
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(10));
        user.setSessions(new ArrayList<>());

        session = new Session();
        session.setIp("127.0.0.1");
        session.setValidUpTo(new Date(System.currentTimeMillis() + 86400000)); // 24 hours from now
        user.getSessions().add(session);
    }

    @Test
    void testCheckCredentials_ValidCredentials() {
        when(userRepository.findByEmailAndStatus("test@example.com", "Onboarded")).thenReturn(user);
        when(passwordEncoder.matches("password", user.getPassword())).thenReturn(true);

        boolean result = authenticationService.checkCredentials("test@example.com", "password");
        assertTrue(result);

        verify(userRepository).findByEmailAndStatus("test@example.com", "Onboarded");
        verify(passwordEncoder).matches("password", user.getPassword());
    }

    @Test
    void testCheckCredentials_InvalidCredentials() {
        when(userRepository.findByEmailAndStatus("test@example.com", "Onboarded")).thenReturn(null);

        boolean result = authenticationService.checkCredentials("test@example.com", "password");
        assertFalse(result);

        verify(userRepository).findByEmailAndStatus("test@example.com", "Onboarded");
    }

    @Test
    void testCheckSession_ValidSession() {
        when(userRepository.findBySessionIpAndSessionValidUpToAndEmail(anyString(), any(Date.class), anyString())).thenReturn(user);

        User result = authenticationService.checkSession("test@example.com", "127.0.0.1");
        assertNotNull(result);

//        verify(userRepository).findBySessionIpAndSessionValidUpToAndEmail("127.0.0.1", any(Date.class), "test@example.com");
    }

    @Test
    void testCheckSession_InvalidSession() {
        when(userRepository.findBySessionIpAndSessionValidUpToAndEmail(any(), any(Date.class), any())).thenReturn(null);

        User result = authenticationService.checkSession("test@example.com", "127.0.0.1");
        assertNull(result);

//        verify(userRepository).findBySessionIpAndSessionValidUpToAndEmail("127.0.0.1", any(Date.class), "test@example.com");
    }

    @Test
    void testCreateSession_NewSession() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(user);

        authenticationService.createSession("test@example.com", "192.168.0.1");

        verify(userRepository).findByEmail("test@example.com");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testCreateSession_ExistingSession() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(user);

        authenticationService.createSession("test@example.com", "127.0.0.1");

        verify(userRepository).findByEmail("test@example.com");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testGenerateAndSendOtp() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(user);

        authenticationService.generateAndSendOtp("test@example.com");

        verify(userRepository).findByEmail("test@example.com");
        verify(userRepository).save(any(User.class));
        //verify(emailService).sendOtpEmail("test@example.com", anyString());
    }

    @Test
    void testValidateOtp_ValidOtp() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(user);

        User result = authenticationService.validateOtp("test@example.com", "123456", "127.0.0.1");
        assertNotNull(result);

        verify(userRepository).findByEmail("test@example.com");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testValidateOtp_InvalidOtp() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(user);

        User result = authenticationService.validateOtp("test@example.com", "654321", "127.0.0.1");
        assertNull(result);

        verify(userRepository).findByEmail("test@example.com");
    }

    @Test
    void testIsDuplicateUser() {
        when(userRepository.findByEmailAndStatus("test@example.com", "Onboarded")).thenReturn(user);

        boolean result = authenticationService.isDuplicateUser("test@example.com");
        assertTrue(result);

        verify(userRepository).findByEmailAndStatus("test@example.com", "Onboarded");
    }

    @Test
    void testCreateUser() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(user);
        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");

        authenticationService.createUser("test@example.com", "password", "ROLE_USER","test","test");

        verify(userRepository).findByEmail("test@example.com");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testResetPassword() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(user);
        when(passwordEncoder.encode("newPassword")).thenReturn("encodedNewPassword");

        authenticationService.resetPassword("test@example.com", "newPassword");

        verify(userRepository).findByEmail("test@example.com");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testGetOnboardingPendingUsers() {
        List<User> users = Arrays.asList(user);
        when(userRepository.findByStatus("Pending")).thenReturn(users);

        List<User> result = authenticationService.getOnboardingPendingUsers();
        assertEquals(users, result);

        verify(userRepository).findByStatus("Pending");
    }

    @Test
    void testUpdateRequestStatus_Accepted() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(user);

        authenticationService.updateRequestStatus("test@example.com", "ROLE_USER", "projectManager", "accepted");

        assertEquals("Onboarded", user.getStatus());
        verify(userRepository).findByEmail("test@example.com");
        verify(userRepository).save(user);
    }

    @Test
    void testUpdateRequestStatus_Rejected() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(user);

        authenticationService.updateRequestStatus("test@example.com", "ROLE_USER", "projectManager", "rejected");

        verify(userRepository).findByEmail("test@example.com");
        verify(userRepository).delete(user);
    }
}
