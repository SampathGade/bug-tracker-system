package com.example.bugtrackersystem.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class PerformanceTest {

    @Test
    public void testGettersAndSetters() {
        Performance performance = new Performance();

        PerformanceValue pastPerformance = new PerformanceValue();
        PerformanceValue lastPerformance = new PerformanceValue();

        pastPerformance.setTotal(10);
        pastPerformance.setCompleted(7);
        pastPerformance.setSpilled(3);

        lastPerformance.setTotal(8);
        lastPerformance.setCompleted(5);
        lastPerformance.setSpilled(3);

        performance.setPastPerformance(pastPerformance);
        performance.setLastPerformance(lastPerformance);

        assertEquals(pastPerformance, performance.getPastPerformance());
        assertEquals(lastPerformance, performance.getLastPerformance());
    }
}
