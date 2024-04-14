package com.example.bugtrackersystem.services.emailSender;

public interface EmailService {
    void sendMailToUser(String recipientEmail, String otp);
    void sendMailToAdmin( String role, String userEmail);
}

