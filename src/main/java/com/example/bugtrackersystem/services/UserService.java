package com.example.bugtrackersystem.services;

import com.example.bugtrackersystem.model.Project;
import com.example.bugtrackersystem.model.Ticket;
import com.example.bugtrackersystem.model.User;
import com.example.bugtrackersystem.repositories.MongoDBManager;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {
    public void save(User user) {
        // Call the insertUser method of MongoDBManager to insert the user into the database
        MongoDBManager.insertUser(user);
    }
    public  User findUserByUsername(String username) {
        // Call the findUserByUsername method of MongoDBManager to find the user in the database
        Document userDocument = MongoDBManager.findUserByUsername(username);
        System.out.println(userDocument);
        System.out.println(userDocument!= null);
        return userDocument != null ? createUserFromDocument(userDocument) : null;
    }

    public  User findUserByEmail(String email) {
        // Call the findUserByEmail method of MongoDBManager to find the user in the database
        Document userDocument = MongoDBManager.findUserByEmail(email);
        return userDocument != null ? createUserFromDocument(userDocument) : null;
    }

    private Project documentToProject(Document document) {
        Project project = new Project();
        project.setId(document.getObjectId("_id").toString());
        project.setName(document.getString("name"));
        project.setCode(document.getString("code"));
        // Set other fields as needed
        return project;
    }

    public List<Project> getAllProjects() {
        List<Document> projectDocuments = MongoDBManager.getAllProjects();
        return projectDocuments.stream()
                .map(this::documentToProject)
                .collect(Collectors.toList());
    }
    private Ticket documentToTicket(Document document) {
        Ticket ticket = new Ticket();
        ticket.setId(document.getObjectId("_id").toString()); // Assuming the use of ObjectId for _id
        ticket.setTitle(document.getString("title"));
        ticket.setDescription(document.getString("description"));
        return ticket;
    }

    public List<Ticket> getAllTickets() {
        List<Document> ticketDocuments = MongoDBManager.getAllTickets();
        return ticketDocuments.stream()
                .map(this::documentToTicket)
                .collect(Collectors.toList());
    }

    public User findById(String userId) {
        Document userDocument = MongoDBManager.findUserById(userId);
        System.out.println("oii"+userDocument);
        return userDocument != null ? createUserFromDocument(userDocument) : null;
    }

    public void delete(User user) {
        MongoDBManager.deleteUser(user.getId());
    }
    private User createUserFromDocument(Document document) {
        // Convert Document object to User object
        User user = new User();
        ObjectId objectId = document.getObjectId("_id");
        user.setId(objectId != null ? objectId : null);
        user.setUsername(document.getString("username"));
        user.setEmail(document.getString("email"));
        user.setPassword(document.getString("password"));

        // Set tickets if available
        Set<Document> ticketDocuments = (Set<Document>) document.get("tickets");
        if (ticketDocuments != null) {
            Set<Ticket> tickets = new HashSet<>();
            for (Document ticketDocument : ticketDocuments) {
                Ticket ticket = createTicketFromDocument(ticketDocument);
                tickets.add(ticket);
            }
            user.setTicketsWorkingOn(tickets);
        }

        return user;
    }


    private Ticket createTicketFromDocument(Document ticketDocument) {
        // Convert Document object to Ticket object
        Ticket ticket = new Ticket();
        ticket.setId(ticketDocument.getString("id"));
        ticket.setTitle(ticketDocument.getString("title"));
        ticket.setDescription(ticketDocument.getString("description"));
        // Set other fields of Ticket if needed

        return ticket;
    }
}
