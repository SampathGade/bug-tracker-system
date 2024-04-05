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


    public void save(Ticket ticket) {

        MongoDBManager.updateTicket(ticket);
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

        Document ticketDocument = MongoDBManager.findTicketById(ticketId);
        if (ticketDocument == null) {
            throw new EntityNotFoundException("Ticket with name " + ticketId + " doesn't exist!");
        }
        return createTicketFromDocument(ticketDocument);
    }
    public Project findByName(String code) {
        Document projectDocument = MongoDBManager.findprojectByName(code);
        if(projectDocument == null) {
            throw new EntityNotFoundException("Project with name " + code + " doesn't exist!");
        }
        return createProjectFromDocument(projectDocument);
    }

    public Ticket getTicketFromRequest(TicketRequest ticketRequest, User author, String project) {
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


        TicketType ticketType = new TicketType(typeName);
        String ticketPriority ="";

        return new Ticket(ticketRequest.getTitle(), ticketRequest.getDescription(),
                new Timestamp(ticketRequest.getTimestamp()), author, ticketType, ticketPriority, project);
    }


    private Ticket createTicketFromDocument(Document document) {
        Ticket ticket = new Ticket();
        ticket.setId(document.get("_id").toString());
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
        project.setId(projectDocument.getObjectId("_id").toString());
        project.setName(projectDocument.getString("name"));
        project.setCode(projectDocument.getString("code"));
        return project;
    }

}
