package com.example.bugtrackersystem.model;


import com.example.bugtrackersystem.model.enums.TicketTypeName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

@EqualsAndHashCode(callSuper = true)
@Table(name = "ticket_types")
@javax.persistence.Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TicketType extends Entity{
    @Enumerated(value = EnumType.STRING)
    private TicketTypeName type;
}