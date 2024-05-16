package com.example.bugtrackersystem.entity;

import org.junit.jupiter.api.Test;
import org.springframework.data.annotation.CreatedDate;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ProjectTest {

    @Test
    public void testGettersAndSetters() {
        Project project = new Project();

        String id = "1";
        String name = "Project A";
        String description = "Description of Project A";
        String projectManager = "Jane Doe";
        List<String> testers = Arrays.asList("Tester1", "Tester2");
        List<String> developers = Arrays.asList("Dev1", "Dev2");
        Date createdDate = new Date();
        List<String> bugTypes = Arrays.asList("Bug1", "Bug2");

        project.setId(id);
        project.setName(name);
        project.setDescription(description);
        project.setProjectManager(projectManager);
        project.setTester(testers);
        project.setDevelopers(developers);
        project.setCreatedDate(createdDate);
        project.setBugTypes(bugTypes);

        assertEquals(id, project.getId());
        assertEquals(name, project.getName());
        assertEquals(description, project.getDescription());
        assertEquals(projectManager, project.getProjectManager());
        assertEquals(testers, project.getTester());
        assertEquals(developers, project.getDevelopers());
        assertEquals(createdDate, project.getCreatedDate());
        assertEquals(bugTypes, project.getBugTypes());
    }
}
