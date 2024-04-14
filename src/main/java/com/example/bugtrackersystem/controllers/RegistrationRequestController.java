package com.example.bugtrackersystem.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bugtrackersystem.requests.ValidateReqistrationRequest;
import com.example.bugtrackersystem.services.registrationRequest.RegistartionRequestServiceImpl;
import com.example.bugtrackersystem.services.registrationRequest.RegistrationRequestService;

@RestController
@RequestMapping("/registrationRequest")
public class RegistrationRequestController {
    private RegistrationRequestService registrationRequestService;

    @Autowired
    public RegistrationRequestController(RegistartionRequestServiceImpl registartionRequestService) {
        this.registrationRequestService = registartionRequestService;
    }

    public ResponseEntity<String> validateRegistration(@RequestBody ValidateReqistrationRequest validateReqistrationRequest) {
        try {
            Boolean approve = validateReqistrationRequest.getApprove();
            if (!approve) {
                registrationRequestService.approveRequest(validateReqistrationRequest.getUserEmail());
            } else {
                registrationRequestService.rejectRequest(validateReqistrationRequest.getUserEmail());
            }
            return new ResponseEntity<>("Registration request successfully updated",HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>("error in validating request", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
