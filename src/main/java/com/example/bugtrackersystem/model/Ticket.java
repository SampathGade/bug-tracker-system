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
    private String projectId;
    private String developer;

    @DBRef
    private User author;

    @DBRef
    private TicketType type;







    public Ticket(String title, String description, Timestamp timestamp, User author, TicketType type,
                  String priority,String projectId){
        this.title = title;
        this.description = description;
        this.timestamp = timestamp;
        this.author = author;
        this.type = type;
        this.projectId = projectId;
        this.developer = null;
        this.priority = priority;
    }
}
