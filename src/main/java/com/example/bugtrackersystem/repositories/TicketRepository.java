package com.example.bugtrackersystem.repositories;

import com.example.bugtrackersystem.model.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Set;

public interface TicketRepository extends MongoRepository<Ticket, String> {
    // Additional query methods can be defined here
    // In TicketRepository
    Set<Ticket> findByProjectId(String projectId);

}