package com.example.bugtrackersystem.services.User;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bugtrackersystem.entity.Project;
import com.example.bugtrackersystem.entity.User;
import com.example.bugtrackersystem.repository.ProjectRepository;
import com.example.bugtrackersystem.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public List<User> getUserDetails(String role, String email) {
        if ("admin".equalsIgnoreCase(role)) {
            return userRepository.findByStatus("Onboarded");
        } else {
            return userRepository.findByStatusAndProjectManager("Onboarded", email);
        }
    }

    public void updateUserDetails(String email , String role, String projectManager) {
        User user = userRepository.findByEmail(email);
        if(user != null) {
            user.setRole(role);
            user.setProjectManager(projectManager);
            userRepository.save(user);
        }
    }

    public List<User> getProjectManagers() {
        List<User> projectManagers = userRepository.findByRoleAndStatus("projectManager","Onboarded");
        if (projectManagers == null) {
           projectManagers = new ArrayList<>();
        }
        return projectManagers;
    }
    public List<User> getDevelopersAndTesters() {
        List<String> roleList = new ArrayList<>();
        roleList.add("developer");
        roleList.add("qa");
        List<User> userList = userRepository.findByRoles(roleList);
        if (userList == null) {
            userList = new ArrayList<>();
        }
        return userList;
    }

    public List<String> getDevelopersByProject(String name) {
        List<String> developers = new ArrayList<>();
        Project project = projectRepository.findByName(name);
        if(project != null) {
            developers = project.getDevelopers()==null ? new ArrayList<>():project.getDevelopers();
        }
        return developers;
    }

}
