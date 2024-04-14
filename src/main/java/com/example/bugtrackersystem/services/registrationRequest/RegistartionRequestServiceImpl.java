package com.example.bugtrackersystem.services.registrationRequest;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.bugtrackersystem.Entity.User;
import com.example.bugtrackersystem.repositories.UserRepository;
import com.example.bugtrackersystem.services.emailSender.EmailService;

public class RegistartionRequestServiceImpl implements RegistrationRequestService{

    private UserRepository userRepository;

    private EmailService emailService;

    @Autowired
    public RegistartionRequestServiceImpl(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
    @Override
    public void approveRequest(String userEmail) {
        User applicant = userRepository.findByUserEmail(userEmail);
        applicant.setStatus("Onboarded");
        userRepository.save(applicant);
//        emailService.sendMailToUser();
    }

    @Override
    public void rejectRequest(String userEmail) {
        User applicant = userRepository.findByUserEmail(userEmail);
        userRepository.delete(applicant);
    }
}
