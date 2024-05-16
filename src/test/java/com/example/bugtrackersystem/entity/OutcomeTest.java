package com.example.bugtrackersystem.entity;

import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class OutcomeTest {

    @Test
    public void testGettersAndSetters() {
        Outcome outcome = new Outcome();

        List<String> images = Arrays.asList("http://example.com/image1.png", "http://example.com/image2.png");
        String text = "This is the outcome text";

        outcome.setImages(images);
        outcome.setText(text);

        assertEquals(images, outcome.getImages());
        assertEquals(text, outcome.getText());
    }
}
