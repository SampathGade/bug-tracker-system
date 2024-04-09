package com.example.bugtrackersystem.repositories;

import com.example.bugtrackersystem.model.TicketPriority;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TicketPriorityRepository extends MongoRepository<TicketPriority, String> {
    // Additional query methods can be defined here
}