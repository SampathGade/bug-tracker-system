package com.example.bugtrackersystem.model;

import com.example.bugtrackersystem.model.Project;
import com.example.bugtrackersystem.model.Role;
import com.example.bugtrackersystem.model.Ticket;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Set<Project> getProjects() {
        return projects;
    }

    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }

    public Set<Project> getProjectsWorkingOn() {
        return projectsWorkingOn;
    }

    public void setProjectsWorkingOn(Set<Project> projectsWorkingOn) {
        this.projectsWorkingOn = projectsWorkingOn;
    }

    public Set<Ticket> getTicketsWorkingOn() {
        return ticketsWorkingOn;
    }

    public void setTicketsWorkingOn(Set<Ticket> ticketsWorkingOn) {
        this.ticketsWorkingOn = ticketsWorkingOn;
    }

    @Id
    private String id;
    private String username;
    private String password;
    private String email;
    private Set<Role> roles = new HashSet<>();
    private Set<Project> projects = new HashSet<>();
    private Set<Project> projectsWorkingOn = new HashSet<>();
    private Set<Ticket> ticketsWorkingOn = new HashSet<>();

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}
