package com.example.bugtrackersystem.entity;

import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class CommentTest {

    @Test
    public void testGettersAndSetters() {
        Comment comment = new Comment();

        String id = "1";
        String author = "John Doe";
        String text = "This is a comment";
        List<String> imageUrls = Arrays.asList("http://example.com/image1.png", "http://example.com/image2.png");

        comment.setId(id);
        comment.setAuthor(author);
        comment.setText(text);
        comment.setImageUrls(imageUrls);

        assertEquals(id, comment.getId());
        assertEquals(author, comment.getAuthor());
        assertEquals(text, comment.getText());
        assertEquals(imageUrls, comment.getImageUrls());
    }
}
