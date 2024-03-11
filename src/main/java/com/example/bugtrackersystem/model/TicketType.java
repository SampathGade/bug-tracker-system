package com.example.bugtrackersystem.model;

import com.example.bugtrackersystem.model.enums.TicketTypeName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "ticket_types")
public class TicketType {
    @Id
    private String id;
    private TicketTypeName type;

    public TicketType(TicketTypeName type) {
        this.type = type;
    }
}
