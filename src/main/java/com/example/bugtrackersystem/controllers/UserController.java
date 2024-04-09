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
    public ResponseEntity<?> assignTicket(@RequestBody TicketRequest request){
        User developer = userService.findUserByUsername(request.getDeveloper());
        Ticket ticket = ticketService.findById(request.getTitle());
        if (ticket == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ticket not found.");
        }
        if (ticket.getDeveloper() == null) {
            ticket.setDeveloper(developer.getUsername());
            developer.getTicketsWorkingOn().add(ticket);
            developer.setTicketsWorkingOn(developer.getTicketsWorkingOn());
            ticketService.save(ticket);
            final String fromEmail = "saiyashwanth01@gmail.com";
            final String accessToken = "ya29.a0Ad52N38UhXgT1_q_H8ZoiD206YLg7vCZmUot_cN0HTgtwFu6Ax9SC4yP9Yee56m_q9pQs0WIYntXlbtgbO3lFWWJmgeXTnc08aPRRig0rM4IderGmPBDQAsXnN8fY0uYyAoHHQELAmhOhouvFYzrWfBl6u4u8tB7X1eiaCgYKAZsSARMSFQHGX2Mi1S3iIOCvzsxe7szbUeSrWA0171";
            emailService.sendTicketAssignmentEmail(developer.getEmail(), fromEmail, accessToken, ticket);
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
        User user = userService.findUserByUsername(projectRequest.getProjectManager());
        newProject.setProjectManager(user.getUsername());
        Project savedProject = projectService.createProject(newProject);
        return new ResponseEntity<>(savedProject, HttpStatus.CREATED);
    }

    @PostMapping("/create/Tickets")
    public ResponseEntity<Ticket> createTicket(@RequestBody TicketRequest ticketRequest) {
        Ticket newTicket = new Ticket();
        newTicket.setTitle(ticketRequest.getTitle());
        newTicket.setDescription(ticketRequest.getDescription());
        Project project = ticketService.findByName(ticketRequest.getProjectId());
        newTicket.setProjectId(project.getCode());
        newTicket.setPriority(ticketRequest.getPriority());
        newTicket.setDeveloper(ticketRequest.getDeveloper());
        Ticket savedTicket = ticketService.createTicket(newTicket);
        return new ResponseEntity<>(savedTicket, HttpStatus.CREATED);
    }


}