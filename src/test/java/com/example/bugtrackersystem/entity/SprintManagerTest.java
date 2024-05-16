package com.example.bugtrackersystem.entity;

import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class SprintManagerTest {

    @Test
    void testSprintManagerGettersAndSetters() {
        SprintManager sprintManager = new SprintManager();
        Date startDate = new Date();
        Date endDate = new Date();
        sprintManager.setId("1");
        sprintManager.setCurrentSprint(true);
        sprintManager.setSprint("Sprint 1");
        sprintManager.setStartDate(startDate);
        sprintManager.setEndDate(endDate);

        assertEquals("1", sprintManager.getId());
        assertTrue(sprintManager.getCurrentSprint());
        assertEquals("Sprint 1", sprintManager.getSprint());
        assertEquals(startDate, sprintManager.getStartDate());
        assertEquals(endDate, sprintManager.getEndDate());
    }
}
