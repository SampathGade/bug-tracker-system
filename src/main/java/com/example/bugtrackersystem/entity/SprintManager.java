package com.example.bugtrackersystem.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "sprintManager")
@Data
@NoArgsConstructor
public class SprintManager {
    @Id
    private String id;
    private Boolean currentSprint;
    private String sprint;
    private Date startDate;
    private Date endDate;
}
