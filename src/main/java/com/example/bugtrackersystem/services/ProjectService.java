package com.example.bugtrackersystem.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.bugtrackersystem.entity.Project;
import com.example.bugtrackersystem.repository.ProjectRepository;

@Service
public class ProjectService {

    @Autowired
    ProjectRepository projectRepository;

    public void createProject(String name, String description, String projectManager, List<String> users) {
        Project project = new Project();
        project.setName(name);
        project.setProjectManager(projectManager);
        project.setDescription(description);
        List<String> bugList = new ArrayList<>();
        bugList.add("Frontend");
        bugList.add("Backend");
        project.setBugTypes(bugList);
        project.setDevelopers(users);
        projectRepository.save(project);
    }

    public List<Project> getProjects(String email , String role) {
        List<Project> projectList = new ArrayList<>();
        if ( "admin".equalsIgnoreCase(role)) {
           projectList = projectRepository.findAll();
        } else if ("productManager".equalsIgnoreCase(role)) {
            projectList = projectRepository.findByProjectManager(email);
        } else {
            projectList = projectRepository.findByDevelopers(email);
        }
        return projectList;
    }

    public void updateProject(String id, String projectName, String projectDescription, String productManager,
                              List<String> developers) {
        Optional<Project> projectOptional = projectRepository.findById(id);

        if (projectOptional.isPresent()) {
            Project existingProject = projectOptional.get();
            existingProject.setName(projectName);
            existingProject.setDescription(projectDescription);
            if(productManager != null)
                existingProject.setProjectManager(productManager);
            if(developers != null)
                existingProject.setDevelopers(developers);
            projectRepository.save(existingProject);
        } else {
            throw new RuntimeException("Project not found with id: " + id);  // Or handle this case as you see fit
        }
    }
}
