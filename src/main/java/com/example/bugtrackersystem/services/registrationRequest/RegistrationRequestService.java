package com.example.bugtrackersystem.services.registrationRequest;

public interface RegistrationRequestService {

    public void approveRequest(String userEmail);

    public void rejectRequest(String userEmail);

}
