package com.example.bugtrackersystem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tickets")
public class Ticket {
    @Id
    private String id;
    private String title;
    private String description;
    private Timestamp timestamp;
    private String priority;

    @DBRef
    private User author;

    @DBRef
    private TicketType type;



    @DBRef
    private Project project;

    @DBRef
    private User developer;

    public Ticket(String title, String description, Timestamp timestamp, User author, TicketType type,
                  String priority, Project project){
        this.title = title;
        this.description = description;
        this.timestamp = timestamp;
        this.author = author;
        this.type = type;
        this.project = project;
        this.developer = null;
        this.priority = priority;
    }
}
