package com.example.bugtrackersystem.controllers;

import com.example.bugtrackersystem.model.Project;
import com.example.bugtrackersystem.model.Ticket;
import com.example.bugtrackersystem.model.User;
import com.example.bugtrackersystem.requests.ProjectRequest;
import com.example.bugtrackersystem.requests.TicketRequest;
import com.example.bugtrackersystem.services.EmailService;
import com.example.bugtrackersystem.services.TicketService;
import com.example.bugtrackersystem.services.UserService;
import lombok.RequiredArgsConstructor;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final TicketService ticketService;
    private final TicketService projectService;
    private final EmailService emailService;
    @GetMapping("/user/{userName}")
    public ResponseEntity<?> getUserById(@PathVariable String userName){
        User user = userService.findUserByUsername(userName);
        System.out.println("hey"+user);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/user/managed-projects")
    public ResponseEntity<?> getProjectsManagedMy(Principal principal){
        User user = userService.findUserByUsername(principal.getName());
        return ResponseEntity.ok(user.getProjects());
    }

    @DeleteMapping("/user")
    public ResponseEntity<?> deleteAccount(Principal principal){
        User user = userService.findUserByUsername(principal.getName());
        for (Project p : user.getProjectsWorkingOn()){
            p.getDevelopers().remove(user);
        }
        for(Ticket t : user.getTicketsWorkingOn()){
            t.setDeveloper(null);
            ticketService.save(t);
        }
        userService.delete(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/projects/{username}")
    public ResponseEntity<?> getAllProjectsForDeveloper(@PathVariable String username){
        User developer = userService.findUserByUsername(username);
        return ResponseEntity.ok(developer.getProjectsWorkingOn());
    }


    @GetMapping("/user/projects/admin")
    public ResponseEntity<?> getAllProjects(){
        List<Project> projects = userService.getAllProjects();
        return ResponseEntity.ok(projects);
    }
    @GetMapping("/user/tickets/admin")
    public ResponseEntity<?> getAllTickets(){
        List<Ticket> tickets = userService.getAllTickets();
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/user/{developerId}/projects")
    @Secured("ROLE_MANAGER")
    public ResponseEntity<?> getAllProjectsForDeveloper(@PathVariable Long developerId){
        User developer = userService.findById(developerId.toString());
        return ResponseEntity.ok(developer.getProjectsWorkingOn());
    }

    @GetMapping("/user/{developerId}/tickets")
    @Secured("ROLE_MANAGER")
    public ResponseEntity<?> getAllTicketsForDeveloper(@PathVariable Long developerId){
        User developer = userService.findById(developerId.toString());
        return ResponseEntity.ok(developer.getTicketsWorkingOn());
    }

    @PostMapping("/user/assign/tickets")
    public ResponseEntity<?> assignTicket(@RequestBody TicketRequest request, Principal principal){
        // Find the developer using the username from the Principal
        User developer = userService.findUserByUsername(principal.getName());

        // Find the ticket based on the ID provided in the request
        // Assuming ticketService.findTicketById(id) exists and returns a Ticket object
        Ticket ticket = ticketService.findById(request.getId());

        if (ticket == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ticket not found.");
        }

        // Check if the ticket is not already assigned to a developer
        if (ticket.getDeveloper() == null) {
            // Assign the ticket to the developer
            ticket.setDeveloper(developer);
            developer.getTicketsWorkingOn().add(ticket);
            developer.setTicketsWorkingOn(developer.getTicketsWorkingOn());
            // Assuming you have a method to save the updated ticket state
            ticketService.save(ticket);

            // Prepare and send the email notification
            final String fromEmail = "saiyashwanth01@gmail.com"; // Should match the Gmail account used for OAuth
            final String accessToken = ""; // OAuth2 access token, securely stored and retrieved

            // Send email notification
            emailService.sendTicketAssignmentEmail(developer.getEmail(), fromEmail, accessToken, ticket);

            // Update the developer's working tickets set and return it
            Set<Ticket> updatedTickets = developer.getTicketsWorkingOn();
            updatedTickets.add(ticket);

            return ResponseEntity.ok(updatedTickets);
        } else {
            return ResponseEntity.badRequest().body("This ticket is already assigned.");
        }
    }


    @PostMapping("/create/projects")
    public ResponseEntity<Project> createProject(@RequestBody ProjectRequest projectRequest) {
        Project newProject = new Project();
        newProject.setName(projectRequest.getName());
        newProject.setCode(projectRequest.getCode());
        User user = userService.findUserByUsername(projectRequest.getProjectManagerId());
        newProject.setProjectManager(user);
        // Assume `projectManager` is determined from the context or provided in the request
        Project savedProject = projectService.createProject(newProject);
        return new ResponseEntity<>(savedProject, HttpStatus.CREATED);
    }

    @PostMapping("/create/Tickets")
    public ResponseEntity<Ticket> createTicket(@RequestBody TicketRequest ticketRequest) {
        Ticket newTicket = new Ticket();
        newTicket.setTitle(ticketRequest.getTitle());
        newTicket.setDescription(ticketRequest.getDescription());
        Project project = ticketService.findByName(ticketRequest.getProjectId());
        newTicket.setProject(project);
        newTicket.setPriority(ticketRequest.getPriority());
        // Set other properties based on `TicketRequest`
         // Assume this method retrieves the currently logged-in user
        // You may also need to set the associated project, type, priority, etc.
        Ticket savedTicket = ticketService.createTicket(newTicket);
        return new ResponseEntity<>(savedTicket, HttpStatus.CREATED);
    }


}