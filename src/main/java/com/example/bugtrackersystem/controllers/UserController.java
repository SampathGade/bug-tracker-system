package com.example.bugtrackersystem.controllers;

import com.example.bugtrackersystem.model.Project;
import com.example.bugtrackersystem.model.Ticket;
import com.example.bugtrackersystem.model.User;
import com.example.bugtrackersystem.requests.ProjectRequest;
import com.example.bugtrackersystem.requests.TicketRequest;
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
import java.util.Set;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final TicketService ticketService;
    private final TicketService projectService;
    @GetMapping("/user/{userName}")
    public ResponseEntity<?> getUserById(@PathVariable String userName){
        User user = userService.findUserByUsername(userName);
        System.out.println("hey"+user);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/user/managed-projects")
    @Secured("ROLE_MANAGER")
    public ResponseEntity<?> getProjectsManagedMy(Principal principal){
        User user = userService.findUserByUsername(principal.getName());
        return ResponseEntity.ok(user.getProjects());
    }

    @DeleteMapping("/user")
    @Secured("ROLE_USER")
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

    @GetMapping("/user/projects")
    @Secured("ROLE_DEVELOPER")
    public ResponseEntity<?> getAllProjectsForDeveloper(Principal principal){
        User developer = userService.findUserByUsername(principal.getName());
        return ResponseEntity.ok(developer.getProjectsWorkingOn());
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
    @Secured("ROLE_DEVELOPER")
    public ResponseEntity<?> assignTicket(TicketRequest request,Principal principal){
       User developer = userService.findUserByUsername(principal.getName());
       if(request.getDeveloper()==null){
           Set<Ticket> set = developer.getTicketsWorkingOn();
       }
        return ResponseEntity.ok(developer.getTicketsWorkingOn());
    }

    @PostMapping("/create/projects")
    public ResponseEntity<Project> createProject(@RequestBody ProjectRequest projectRequest) {
        Project newProject = new Project();
        newProject.setName(projectRequest.getName());
        newProject.setCode(projectRequest.getCode());
        // Assume `projectManager` is determined from the context or provided in the request
        Project savedProject = projectService.createProject(newProject);
        return new ResponseEntity<>(savedProject, HttpStatus.CREATED);
    }

    @PostMapping("/create/Tickets")
    public ResponseEntity<Ticket> createTicket(@RequestBody TicketRequest ticketRequest) {
        Ticket newTicket = new Ticket();
        newTicket.setTitle(ticketRequest.getTitle());
        newTicket.setDescription(ticketRequest.getDescription());
        // Set other properties based on `TicketRequest`
         // Assume this method retrieves the currently logged-in user
        // You may also need to set the associated project, type, priority, etc.
        Ticket savedTicket = ticketService.createTicket(newTicket);
        return new ResponseEntity<>(savedTicket, HttpStatus.CREATED);
    }


}