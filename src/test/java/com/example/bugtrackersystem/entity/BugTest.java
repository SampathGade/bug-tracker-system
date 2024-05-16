package com.example.bugtrackersystem.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class BugTest {

    private Bug bug;
    private Assignee assignee;
    private Outcome expectedOutcome;
    private Outcome actualOutcome;
    private Comment comment;

    @BeforeEach
    void setUp() {
        assignee = new Assignee();
        expectedOutcome = new Outcome();
        actualOutcome = new Outcome();
        comment = new Comment();

        bug = new Bug();
        bug.setId("1");
        bug.setName("Bug 1");
        bug.setDescription("Bug Description");
        bug.setProject("Project 1");
        bug.setType("Type 1");
        bug.setProjectManager("Manager 1");
        bug.setAssignee("Assignee 1");
        List<Comment> comments = new ArrayList<>();
        comments.add(comment);
        bug.setComments(comments);
        bug.setStatus("Open");
        bug.setSprint("Sprint 1");
        bug.setStoryPoints(5);
        bug.setCreatedBy(assignee);
        bug.setExpectedOutcome(expectedOutcome);
        bug.setActualOutcome(actualOutcome);
        bug.setSlaDate(new Date());
        bug.setPriority("High");
    }

    @Test
    void testGettersAndSetters() {
        assertEquals("1", bug.getId());
        assertEquals("Bug 1", bug.getName());
        assertEquals("Bug Description", bug.getDescription());
        assertEquals("Project 1", bug.getProject());
        assertEquals("Type 1", bug.getType());
        assertEquals("Manager 1", bug.getProjectManager());
        assertEquals("Assignee 1", bug.getAssignee());
        assertEquals(1, bug.getComments().size());
        assertEquals("Open", bug.getStatus());
        assertEquals("Sprint 1", bug.getSprint());
        assertEquals(5, bug.getStoryPoints());
        assertEquals(assignee, bug.getCreatedBy());
        assertEquals(expectedOutcome, bug.getExpectedOutcome());
        assertEquals(actualOutcome, bug.getActualOutcome());
        assertNotNull(bug.getSlaDate());
        assertEquals("High", bug.getPriority());
    }

    @Test
    void testNoArgsConstructor() {
        Bug emptyBug = new Bug();
        assertNotNull(emptyBug);
    }
}
