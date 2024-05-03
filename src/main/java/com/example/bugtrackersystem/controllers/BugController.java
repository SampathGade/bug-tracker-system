package com.example.bugtrackersystem.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.example.bugtrackersystem.entity.Bug;
import com.example.bugtrackersystem.entity.User;
import com.example.bugtrackersystem.repository.BugRepository;
import com.example.bugtrackersystem.requests.GetUsersRequest;
import com.example.bugtrackersystem.services.BugService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/bug")
public class BugController {

    @Autowired
    private BugService bugService;

    @Autowired
    private BugRepository bugRepository;

    @PostMapping("/getBugsByUser")
    public ResponseEntity<?> getBugs(@RequestBody GetUsersRequest getUsersRequest) {
        try {
            List<Bug> bugList = bugService.getBugs(getUsersRequest.getRole(), getUsersRequest.getEmail(), getUsersRequest.getProject(), getUsersRequest.getAssignee());
            return ResponseEntity.ok().body(bugList);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An internal server error occurred. Please try again.");
        }
    }

    @PostMapping("/createBug")
    public ResponseEntity<?> createBug(@RequestBody Bug bug) {
        try {
            bug.setStatus("To Do");
            bugRepository.save(bug);
            return ResponseEntity.ok().body("bug created succesfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An internal server error occurred. Please try again.");
        }
    }

    @PostMapping("/updateBug")
    public ResponseEntity<?> updateBug(@RequestBody Bug bug) {
        try {
           Bug updateBug = bugRepository.findByname(bug.getName());
           updateBug.setAssignee(bug.getAssignee());
           updateBug.setProjectManager(bug.getProjectManager());
           updateBug.setComments(bug.getComments());
            return ResponseEntity.ok().body("bug created succesfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An internal server error occurred. Please try again.");
        }
    }



}
