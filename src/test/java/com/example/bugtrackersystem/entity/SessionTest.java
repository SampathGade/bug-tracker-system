package com.example.bugtrackersystem.entity;

import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class SessionTest {

    @Test
    void testSessionGettersAndSetters() {
        Session session = new Session();
        Date validUpTo = new Date();
        session.setIp("192.168.0.1");
        session.setValidUpTo(validUpTo);
        session.setOtpValidated(true);

        assertEquals("192.168.0.1", session.getIp());
        assertEquals(validUpTo, session.getValidUpTo());
        assertTrue(session.isOtpValidated());
    }
}
