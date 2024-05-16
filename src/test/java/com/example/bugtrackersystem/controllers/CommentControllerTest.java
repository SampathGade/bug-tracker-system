package com.example.bugtrackersystem.controllers;

import com.example.bugtrackersystem.entity.Bug;
import com.example.bugtrackersystem.entity.Comment;
import com.example.bugtrackersystem.repository.BugRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class CommentControllerTest {

    @Mock
    private BugRepository bugRepository;

    @InjectMocks
    private CommentController commentController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void addComment_ShouldAddCommentToBug() {
        String bugId = "1";
        Comment comment = new Comment();
        comment.setId("101");
        comment.setText("New comment");

        Bug bug = new Bug();
        bug.setId(bugId);
        bug.setComments(new ArrayList<>());

        when(bugRepository.findById(bugId)).thenReturn(Optional.of(bug));
        when(bugRepository.save(any(Bug.class))).thenReturn(bug);

        Bug updatedBug = commentController.addComment(bugId, comment);

        assertEquals(1, updatedBug.getComments().size());
        assertEquals("New comment", updatedBug.getComments().get(0).getText());

        verify(bugRepository, times(1)).findById(bugId);
        verify(bugRepository, times(1)).save(any(Bug.class));
    }

    @Test
    void addComment_ShouldReturnNullIfBugNotFound() {
        String bugId = "1";
        Comment comment = new Comment();
        comment.setId("101");

        when(bugRepository.findById(bugId)).thenReturn(Optional.empty());

        Bug updatedBug = commentController.addComment(bugId, comment);

        assertNull(updatedBug);
        verify(bugRepository, times(1)).findById(bugId);
        verify(bugRepository, times(0)).save(any(Bug.class));
    }

    @Test
    void updateComment_ShouldUpdateCommentInBug() {
        String bugId = "1";
        String commentId = "101";
        Comment updatedComment = new Comment();
        updatedComment.setText("Updated comment");

        Comment existingComment = new Comment();
        existingComment.setId(commentId);
        existingComment.setText("Old comment");

        Bug bug = new Bug();
        bug.setId(bugId);
        List<Comment> comments = new ArrayList<>();
        comments.add(existingComment);
        bug.setComments(comments);

        when(bugRepository.findById(bugId)).thenReturn(Optional.of(bug));
        when(bugRepository.save(any(Bug.class))).thenReturn(bug);

        Bug updatedBug = commentController.updateComment(bugId, commentId, updatedComment);

        assertEquals(1, updatedBug.getComments().size());
        assertEquals("Updated comment", updatedBug.getComments().get(0).getText());

        verify(bugRepository, times(1)).findById(bugId);
        verify(bugRepository, times(1)).save(any(Bug.class));
    }

    @Test
    void updateComment_ShouldReturnNullIfBugNotFound() {
        String bugId = "1";
        String commentId = "101";
        Comment updatedComment = new Comment();
        updatedComment.setText("Updated comment");

        when(bugRepository.findById(bugId)).thenReturn(Optional.empty());

        Bug updatedBug = commentController.updateComment(bugId, commentId, updatedComment);

        assertNull(updatedBug);
        verify(bugRepository, times(1)).findById(bugId);
        verify(bugRepository, times(0)).save(any(Bug.class));
    }

    @Test
    void deleteComment_ShouldRemoveCommentFromBug() {
        String bugId = "1";
        String commentId = "101";

        Comment existingComment = new Comment();
        existingComment.setId(commentId);
        existingComment.setText("Comment to delete");

        Bug bug = new Bug();
        bug.setId(bugId);
        List<Comment> comments = new ArrayList<>();
        comments.add(existingComment);
        bug.setComments(comments);

        when(bugRepository.findById(bugId)).thenReturn(Optional.of(bug));
        when(bugRepository.save(any(Bug.class))).thenReturn(bug);

        Bug updatedBug = commentController.deleteComment(bugId, commentId);

        assertEquals(0, updatedBug.getComments().size());

        verify(bugRepository, times(1)).findById(bugId);
        verify(bugRepository, times(1)).save(any(Bug.class));
    }

    @Test
    void deleteComment_ShouldReturnNullIfBugNotFound() {
        String bugId = "1";
        String commentId = "101";

        when(bugRepository.findById(bugId)).thenReturn(Optional.empty());

        Bug updatedBug = commentController.deleteComment(bugId, commentId);

        assertNull(updatedBug);
        verify(bugRepository, times(1)).findById(bugId);
        verify(bugRepository, times(0)).save(any(Bug.class));
    }
}
