package com.example.bugtrackersystem.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Performance {
   private PerformanceValue pastPerformance;
   private PerformanceValue lastPerformance;
}
