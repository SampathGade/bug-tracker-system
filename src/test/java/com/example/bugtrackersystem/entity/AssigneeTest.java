package com.example.bugtrackersystem.entity;

import com.example.bugtrackersystem.entity.Assignee;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class AssigneeTest {

    @Test
    public void testNoArgsConstructor() {
        Assignee assignee = new Assignee();
        assertNotNull(assignee);
    }

    @Test
    public void testGettersAndSetters() {
        Assignee assignee = new Assignee();
        String id = "123";
        String email = "test@example.com";
        Date createdAt = new Date();

        assignee.setId(id);
        assignee.setEmail(email);
        assignee.setCreateAt(createdAt);

        assertEquals(id, assignee.getId());
        assertEquals(email, assignee.getEmail());
        assertEquals(createdAt, assignee.getCreateAt());
    }
}
