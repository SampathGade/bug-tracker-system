package com.example.bugtrackersystem.services;

import com.example.bugtrackersystem.repositories.MongoDBManager;
import com.example.bugtrackersystem.requests.ProjectAddRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectService {
    public void save(ProjectAddRequest projectAddRequest) {
        MongoDBManager.insertProject(projectAddRequest);
    }
}
