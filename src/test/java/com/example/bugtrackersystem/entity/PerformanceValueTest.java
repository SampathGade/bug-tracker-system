package com.example.bugtrackersystem.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class PerformanceValueTest {

    @Test
    public void testGettersAndSetters() {
        PerformanceValue performanceValue = new PerformanceValue();

        Integer total = 10;
        Integer completed = 7;
        Integer spilled = 3;

        performanceValue.setTotal(total);
        performanceValue.setCompleted(completed);
        performanceValue.setSpilled(spilled);

        assertEquals(total, performanceValue.getTotal());
        assertEquals(completed, performanceValue.getCompleted());
        assertEquals(spilled, performanceValue.getSpilled());
    }
}
