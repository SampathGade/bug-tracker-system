package com.example.bugtrackersystem.exceptions;



public class EntityNotFoundException extends RuntimeException{
    public EntityNotFoundException(String message){
        super(message);
    }
}