package com.example.bugtrackersystem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "projects")
public class Project {
    @Id
    private String id;
    private String name;
    private String code;

    @DBRef
    private String projectManager;

    @DBRef
    private Set<User> developers = new HashSet<>();

    @DBRef
    private Set<Ticket> tickets = new HashSet<>();

    public Project(String name, String projectManager) {
        this.name = name;
        this.projectManager = projectManager;
        this.code = generateCode();
    }

    private String generateCode() {
        int length = 6;
        return RandomStringUtils.random(length, true, true);
    }

    public void addDeveloper(User developer) {
        developers.add(developer);
    }

    public void removeDeveloper(User developer) {
        developers.remove(developer);
    }

    public void addTicket(Ticket ticket){
        tickets.add(ticket);
    }

    public void removeTicket(Ticket ticket){
        tickets.remove(ticket);
    }
}
