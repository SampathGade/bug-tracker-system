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
           return bugRepository.findById(bug.getId()).map(existingBug -> {
               existingBug.setName(bug.getName());
               existingBug.setDescription(bug.getDescription());
               // Save the updated bug
               bugRepository.save(existingBug);
               return ResponseEntity.ok().body("Bug status updated successfully");
           }).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An internal server error occurred. Please try again.");
        }
    }

    @PostMapping("/updateBugStatus")
    public ResponseEntity<?> updateBugStatus(@RequestBody Bug bug) {
        try {
            // Check if the bug exists in the database
            return bugRepository.findById(bug.getId()).map(existingBug -> {
                existingBug.setStatus(bug.getStatus());
                // Save the updated bug
                bugRepository.save(existingBug);
                return ResponseEntity.ok().body("Bug status updated successfully");
            }).orElseGet(() -> ResponseEntity.notFound().build()); // Handle the case where the bug is not found
        } catch (Exception e) {
            // Log the exception (you could log the stack trace or message)
            e.printStackTrace(); // For demonstration purposes
            return ResponseEntity.internalServerError().body("An internal server error occurred: " + e.getMessage());
        }
    }



}
