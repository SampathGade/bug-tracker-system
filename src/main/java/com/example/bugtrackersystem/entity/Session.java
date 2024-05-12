package com.example.bugtrackersystem.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@Data
public class Session {
    private String ip;
    private Date validUpTo;
    private boolean otpValidated;
}
