package com.example.bugtrackersystem.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@Data
public class Assignee {
    private String id;
    private String email;
    private Date createAt;
}
