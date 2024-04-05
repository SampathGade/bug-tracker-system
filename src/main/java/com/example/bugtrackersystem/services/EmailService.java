package com.example.bugtrackersystem.services;

import com.example.bugtrackersystem.model.Ticket;
import org.springframework.stereotype.Service;
import com.example.bugtrackersystem.model.User;
import com.example.bugtrackersystem.requests.LoginRequest;
import com.example.bugtrackersystem.requests.RegisterRequest;
import com.example.bugtrackersystem.requests.VerifyOTPRequest;
import com.example.bugtrackersystem.services.AuthService;
import com.sun.mail.smtp.SMTPTransport;
import lombok.RequiredArgsConstructor;
import org.apache.commons.text.RandomStringGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Properties;

@Service
public class EmailService {
    public void sendTicketAssignmentEmail(String toEmail, String fromEmail, String accessToken, Ticket ticket) {
        final String fromEmail1 = "bug-tracker-server <saiyashwant01@gmail.com>";
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth.mechanisms", "XOAUTH2");

        Session session = Session.getInstance(props);

        String emailBody = String.format(
                "Dear Developer,\n\n" +
                        "You have been assigned a new ticket: '%s'\n\n" +
                        "Details:\n" +
                        "- Description: %s\n" +
                        "Please check your dashboard for more information and to update the ticket status.\n\n" +
                        "Best,\n" +
                        "Your Bug Tracker System",
                ticket.getTitle(), ticket.getDescription());
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(fromEmail1));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
            message.setSubject("New Ticket Assignment: " + ticket.getTitle());
            message.setText(emailBody);

            SMTPTransport transport = (SMTPTransport) session.getTransport("smtp");
            transport.connect("smtp.gmail.com", fromEmail, accessToken);
            transport.sendMessage(message, message.getAllRecipients());

            System.out.println("Ticket assignment email sent successfully to: " + toEmail);
        } catch (MessagingException e) {
            System.err.println("Error sending ticket assignment email: " + e.getMessage());
            e.printStackTrace();
        }
    }

}
