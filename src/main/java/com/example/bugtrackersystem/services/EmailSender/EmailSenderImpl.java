package com.example.bugtrackersystem.services.EmailSender;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderImpl implements EmailSender {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("drakedraganeel@gmail.com");  // Same as your `spring.mail.username`
        message.setTo(to);
        message.setSubject("Otp for bug tracker");
        message.setText("Here is your OTP for login/Sign up : " + otp);
        mailSender.send(message);
        System.out.println("OTP email sent successfully!");
    }
}
