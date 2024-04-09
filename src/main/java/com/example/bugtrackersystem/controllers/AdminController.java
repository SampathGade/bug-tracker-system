package com.example.bugtrackersystem.controllers;

import com.example.bugtrackersystem.model.Project;
import com.example.bugtrackersystem.model.Role;
import com.example.bugtrackersystem.model.Ticket;
import com.example.bugtrackersystem.model.User;
import com.example.bugtrackersystem.repositories.ProjectRepository;
import com.example.bugtrackersystem.repositories.RoleRepository;
import com.example.bugtrackersystem.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("create/projects")
    public Project createProject(@RequestBody Project project) {
        return projectRepository.save(project);
    }
    @PostMapping("/projects/{projectId}/assignUser")
    public Project assignUserToProject(@PathVariable String projectId, @RequestBody String userId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        project.addDeveloper(user);
        return projectRepository.save(project);
    }

    @PostMapping("/users/{userId}/assignRole")
    public User assignRoleToUser(@PathVariable String userId, @RequestBody String roleName) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Role role = roleRepository.findByRole(roleName);

        if (role == null) {
            throw new RuntimeException("Role not found");
        }

        user.getRoles().add(role);
        return userRepository.save(user);
    }
    @GetMapping("/projects")
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
    @GetMapping("/projects/{projectId}/tickets")
    public Set<Ticket> getTicketsByProjectId(@PathVariable String projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found"));
        return project.getTickets();
    }


}
