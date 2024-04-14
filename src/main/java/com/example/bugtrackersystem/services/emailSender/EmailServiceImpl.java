package com.example.bugtrackersystem.services.emailSender;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.bugtrackersystem.repositories.UserRepository;

import java.util.List;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender emailSender;
    private final UserRepository userRepository;
    private final String senderEmail;

    @Autowired
    public EmailServiceImpl(JavaMailSender emailSender, UserRepository userRepository, @Value("${email.sender}") String senderEmail) {
        this.emailSender = emailSender;
        this.userRepository = userRepository;
        this.senderEmail = senderEmail;
    }

    @Override
    public void sendMailToAdmin(String role, String userEmail) {
        List<String> adminEmails = userRepository.findUserEmailByRole(role);
        for (String adminEmail : adminEmails) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(adminEmail);
            message.setSubject("Review Pending for User");
            message.setText("User Email: " + userEmail + "\nRole: " + role);
            message.setFrom(senderEmail);
            emailSender.send(message);
        }
    }

    @Override
    public void sendMailToUser(String recipientEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("OTP for Bug Tracker Validation");
        message.setText("Your OTP is: " + otp);
        message.setFrom(senderEmail);

        emailSender.send(message);
    }
}
