package com.example.bugtrackersystem.model;

import com.example.bugtrackersystem.model.enums.TicketPriorityName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "ticket_priorities")
public class TicketPriority {
    @Id
    private String id;
    private TicketPriorityName priority;

    public TicketPriority(TicketPriorityName priority) {
        this.priority = priority;
    }
}
