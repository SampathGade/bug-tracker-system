package com.example.bugtrackersystem.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "bugDetails")
@Data
@NoArgsConstructor
public class Bug {
    @Id
    private String id;
    private String name;
    private String description;
    private String project;
    private String type;
    private String projectManager;
    private String assignee;
    private List<Comment> comments;
    private String status;
    private String sprint;
    private Integer storyPoints;
    private Assignee createdBy;
    private Outcome expectedOutcome;
    private Outcome actualOutcome;
    private Date slaDate;
    private String priority;
}
