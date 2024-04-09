package com.example.bugtrackersystem.controllers;

import com.example.bugtrackersystem.model.Project;
import com.example.bugtrackersystem.model.Ticket;
import com.example.bugtrackersystem.model.User;
import com.example.bugtrackersystem.repositories.ProjectRepository;
import com.example.bugtrackersystem.repositories.TicketRepository;
import com.example.bugtrackersystem.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/manager")
public class ManagerController {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    // Create a new project
    @PostMapping("/projects")
    public Project createProject(@RequestBody Project project) {
        return projectRepository.save(project);
    }

    // Create a new bug (ticket)
    @PostMapping("/tickets")
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    // Assign a bug to a developer based on specialty
    @PostMapping("/tickets/{ticketId}/assign/{userId}")
    public Ticket assignTicketToDeveloper(@PathVariable String ticketId, @PathVariable String userId) {
        Ticket ticket = ticketRepository.findById(ticketId).orElseThrow(() -> new RuntimeException("Ticket not found"));
        User developer = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        if (!developer.getSpecialty().equals(ticket.getType().getType())) {
            throw new RuntimeException("Developer's specialty does not match the ticket type");
        }

        ticket.setDeveloper(developer.getUsername()); // Assuming you store the username or ID
        return ticketRepository.save(ticket);
    }

    // View all unassigned bugs
    @GetMapping("/tickets/unassigned")
    public List<Ticket> viewUnassignedTickets() {
        return ticketRepository.findAll().stream()
                .filter(ticket -> ticket.getDeveloper() == null)
                .collect(Collectors.toList());
    }

    // Delete a bug
    @DeleteMapping("/tickets/{ticketId}")
    public String deleteTicket(@PathVariable String ticketId) {
        ticketRepository.deleteById(ticketId);
        return "Ticket deleted successfully";
    }

    // Re-assign a bug to another developer
    // This can reuse the assignTicketToDeveloper method with a new userId

    // Get detailed report on bugs from all projects
    // This method would need further clarification on what details are required.
    // For simplicity, here's how you might list all tickets with their project names.
    @GetMapping("/tickets/report")
    public List<Object> getTicketsReport() {
        return ticketRepository.findAll().stream()
                .map(ticket -> {
                    Project project = projectRepository.findById(ticket.getProjectId()).orElseThrow(() -> new RuntimeException("Project not found"));
                    return new Object() { // Anonymous class for simplicity
                        public String projectName = project.getName();
                        public String ticketTitle = ticket.getTitle();
                        public String priority = ticket.getPriority();
                    };
                }).collect(Collectors.toList());
    }
}
