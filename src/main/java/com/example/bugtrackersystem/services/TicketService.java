package com.example.bugtrackersystem.services;

import com.example.bugtrackersystem.exceptions.EntityNotFoundException;
import com.example.bugtrackersystem.model.*;
import com.example.bugtrackersystem.model.enums.TicketPriorityName;
import com.example.bugtrackersystem.model.enums.TicketTypeName;
import com.example.bugtrackersystem.repositories.MongoDBManager;
import com.example.bugtrackersystem.requests.TicketRequest;
import lombok.RequiredArgsConstructor;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
@RequiredArgsConstructor
public class TicketService {
    // You can inject MongoDBManager here if needed

    public void save(Ticket ticket) {
        // Implement save logic using MongoDBManager
        MongoDBManager.insertTicket(ticket);
    }
    public Project createProject(Project project) {
        MongoDBManager.insertProject(project);
        return project;
    }
    public Ticket createTicket(Ticket ticket) {
        MongoDBManager.insertTicket(ticket);
        return ticket;
    }

    public Ticket findById(String ticketId) {
        // Implement find by ID logic using MongoDBManager
        Document ticketDocument = MongoDBManager.findTicketById(ticketId);
        if (ticketDocument == null) {
            throw new EntityNotFoundException("Ticket with id " + ticketId + " doesn't exist!");
        }
        // Convert Document to Ticket object
        return createTicketFromDocument(ticketDocument);
    }
    public Project findByName(String code) {
        Document projectDocument = MongoDBManager.findprojectByName(code);
        if(projectDocument == null) {
            throw new EntityNotFoundException("Project with name " + code + " doesn't exist!");
        }
        return createProjectFromDocument(projectDocument);
    }

    public Ticket getTicketFromRequest(TicketRequest ticketRequest, User author, Project project) {
        TicketTypeName typeName;
        try {
            typeName = TicketTypeName.valueOf(ticketRequest.getType());
        } catch (IllegalArgumentException exception) {
            throw new EntityNotFoundException("Invalid ticket type");
        }

        TicketPriorityName priorityName;
        try {
            priorityName = TicketPriorityName.valueOf(ticketRequest.getPriority());
        } catch (IllegalArgumentException exception) {
            throw new EntityNotFoundException("Invalid ticket priority");
        }

        // Here you can directly create TicketType and TicketPriority objects
        TicketType ticketType = new TicketType(typeName); // Assuming TicketType constructor accepts TicketTypeName
        String ticketPriority =""; // Assuming TicketPriority constructor accepts TicketPriorityName

        return new Ticket(ticketRequest.getTitle(), ticketRequest.getDescription(),
                new Timestamp(ticketRequest.getTimestamp()), author, ticketType, ticketPriority, project);
    }

    // Method to create Ticket object from Document retrieved from MongoDB
    private Ticket createTicketFromDocument(Document document) {
        Ticket ticket = new Ticket();
        ticket.setId(document.getString("_id"));
        ticket.setTitle(document.getString("title"));
        ticket.setDescription(document.getString("description"));
        ticket.setTimestamp(document.get("timestamp",Timestamp.class));
        return ticket;
    }
    public Project createProjectFromDocument(Document projectDocument) {
        if (projectDocument == null) {
            return null;
        }

        Project project = new Project();
        project.setId(projectDocument.getObjectId("_id").toString()); // Convert ObjectId to String
        project.setName(projectDocument.getString("name"));
        project.setCode(projectDocument.getString("code"));

        // Assuming project manager is stored as an ObjectId reference

        // You would typically fetch the ProjectManager entity using this ID
        // For simplicity, we're just setting the ID as a string here.
        // project.setProjectManager(findUserById(projectManagerId));

        // Add logic for other fields, such as developers and tickets, similar to project manager
        // This often involves fetching related entities by their IDs

        return project;
    }

}
