package com.example.bugtrackersystem.exceptions;


public class EmailAlreadyInUse extends RuntimeException {
    public EmailAlreadyInUse(String s) {
        super(s);
    }
}