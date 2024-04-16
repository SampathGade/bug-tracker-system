package com.example.bugtrackersystem.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "projectDetails")  // Specifies the collection name in MongoDB
@Data
@NoArgsConstructor
public class Project {
    @Id
    private String id;

    private String name;

    private String description;

    private String projectManager;

    private List<String> users;

    @CreatedDate
    private Date createdDate;

    private List<String> bugTypes;

}
