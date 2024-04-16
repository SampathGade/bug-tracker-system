package com.example.bugtrackersystem.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "bugDetails")
@Data
@NoArgsConstructor
public class Bug {
    @Id
    private String id;
    private String name;
    private String projectName;
    private String bugType;
    private String projectManager;
    private String assignee;
    private List<String> comments;
    private String createdBy;
}