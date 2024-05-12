package com.example.bugtrackersystem.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.example.bugtrackersystem.entity.Bug;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateBugRequest {
    private Bug bug;
    private UserDetails userDetails;
}
