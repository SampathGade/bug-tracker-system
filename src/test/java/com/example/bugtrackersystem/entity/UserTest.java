package com.example.bugtrackersystem.entity;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    void testUserGettersAndSetters() {
        User user = new User();
        LocalDateTime otpExpiry = LocalDateTime.now();
        List<Session> sessions = new ArrayList<>();
        Performance performance = new Performance();

        user.setId("1");
        user.setEmail("test@example.com");
        user.setPassword("password");
        user.setOtp("123456");
        user.setOtpExpiry(otpExpiry);
        user.setRole("admin");
        user.setStatus("active");
        user.setProjectManager("manager1");
        user.setSessions(sessions);
        user.setPerformances(performance);

        assertEquals("1", user.getId());
        assertEquals("test@example.com", user.getEmail());
        assertEquals("password", user.getPassword());
        assertEquals("123456", user.getOtp());
        assertEquals(otpExpiry, user.getOtpExpiry());
        assertEquals("admin", user.getRole());
        assertEquals("active", user.getStatus());
        assertEquals("manager1", user.getProjectManager());
        assertEquals(sessions, user.getSessions());
        assertEquals(performance, user.getPerformances());
    }
}
