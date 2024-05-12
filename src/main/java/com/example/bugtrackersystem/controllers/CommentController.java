package com.example.bugtrackersystem.controllers;

import com.example.bugtrackersystem.entity.Bug;
import com.example.bugtrackersystem.entity.Comment;
import com.example.bugtrackersystem.repository.BugRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private BugRepository bugRepository;

    @PostMapping("/{bugId}")
    public Bug addComment(@PathVariable String bugId, @RequestBody Comment comment) {
        Optional<Bug> bugOptional = bugRepository.findById(bugId);
        if (bugOptional.isPresent()) {
            Bug bug = bugOptional.get();
            List<Comment> comments = bug.getComments();
            if(comments == null) {
                comments = new ArrayList<>();
            }
            comments.add(comment);
            bug.setComments(comments);
            return bugRepository.save(bug);
        }
        return null;
    }

    @PutMapping("/{bugId}/{commentId}")
    public Bug updateComment(@PathVariable String bugId, @PathVariable String commentId, @RequestBody Comment updatedComment) {
        Optional<Bug> bugOptional = bugRepository.findById(bugId);
        if (bugOptional.isPresent()) {
            Bug bug = bugOptional.get();
            bug.getComments().stream()
                    .filter(c -> c.getId().equals(commentId))
                    .findFirst()
                    .ifPresent(comment -> {
                        comment.setText(updatedComment.getText());
                        comment.setImageUrls(updatedComment.getImageUrls());
                    });
            return bugRepository.save(bug);
        }
        return null;
    }

    @DeleteMapping("/{bugId}/{commentId}")
    public Bug deleteComment(@PathVariable String bugId, @PathVariable String commentId) {
        Optional<Bug> bugOptional = bugRepository.findById(bugId);
        if (bugOptional.isPresent()) {
            Bug bug = bugOptional.get();
            bug.getComments().removeIf(comment -> comment.getId().equals(commentId));
            return bugRepository.save(bug);
        }
        return null;
    }
}
