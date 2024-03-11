package com.example.bugtrackersystem.exceptions;


public class UsernameNotAvailableException extends RuntimeException {
    public UsernameNotAvailableException(String s) {
        super(s);
    }
}