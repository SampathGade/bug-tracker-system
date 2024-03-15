package com.example.bugtrackersystem.services;

import com.example.bugtrackersystem.exceptions.EntityNotFoundException;
import com.example.bugtrackersystem.model.*;
import com.example.bugtrackersystem.model.enums.TicketPriorityName;
import com.example.bugtrackersystem.model.enums.TicketTypeName;
import com.example.bugtrackersystem.repositories.MongoDBManager;
import com.example.bugtrackersystem.requests.TicketRequest;
import lombok.RequiredArgsConstructor;
import org.bson.Document;
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

    public Ticket findById(String ticketId) {
        // Implement find by ID logic using MongoDBManager
        Document ticketDocument = MongoDBManager.findTicketById(ticketId);
        if (ticketDocument == null) {
            throw new EntityNotFoundException("Ticket with id " + ticketId + " doesn't exist!");
        }
        // Convert Document to Ticket object
        return createTicketFromDocument(ticketDocument);
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
        TicketPriority ticketPriority = new TicketPriority(priorityName); // Assuming TicketPriority constructor accepts TicketPriorityName

        return new Ticket(ticketRequest.getTitle(), ticketRequest.getDescription(),
                new Timestamp(ticketRequest.getTimestamp()), author, ticketType, ticketPriority, project);
    }

    // Method to create Ticket object from Document retrieved from MongoDB
    private Ticket createTicketFromDocument(Document document) {
        Ticket ticket = new Ticket();
        ticket.setId(document.getString("_id"));
        ticket.setTitle(document.getString("title"));
        ticket.setDescription(document.getString("description"));
        // Set other fields accordingly
        return ticket;
    }
}
