package com.example.bugtrackersystem.exceptions;



public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String message){
        super(message);
    }
}