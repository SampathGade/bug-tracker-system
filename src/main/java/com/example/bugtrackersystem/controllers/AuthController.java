package com.example.bugtrackersystem.controllers;

import com.example.bugtrackersystem.model.User;
import com.example.bugtrackersystem.requests.LoginRequest;
import com.example.bugtrackersystem.requests.RegisterRequest;
import com.example.bugtrackersystem.requests.VerifyOTPRequest;
import com.example.bugtrackersystem.services.AuthService;
import com.example.bugtrackersystem.services.UserService;
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
@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    private final AuthService authService;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    // Map to store OTPs temporarily
    private Map<String, String> otpMap = new HashMap<>();

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        User user = authService.login(loginRequest.getUsername(), loginRequest.getPassword());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        // Generate OTP and send it to the user's email
        String otp = generateOTP();
        otpMap.put(user.getEmail(), otp);
        sendOTPEmail(user.getEmail(), otp, "saiyashwanth01@gmail.com", "yourAccessTokenHere");

        // Inform the user that an OTP has been sent
        return ResponseEntity.ok("OTP sent to your email. Please verify to complete login.");
    }


    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Application in Good Health");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        User user = new User(registerRequest.getUsername(),
                registerRequest.getPassword(),
                registerRequest.getEmail());

        // Assuming register method only stores user data temporarily without enabling the account
        User registeredUser = authService.register(user, passwordEncoder);

        // Send notification to admin for approval
        sendAdminApprovalRequest(registeredUser);

        // Inside your @PostMapping("/register") method
        String subject = "Registration Pending Approval";
        String body = "Dear " + registerRequest.getUsername() + ",\n\nYour registration request has been received and is pending admin approval. You will be notified once your account is activated.";
        sendUserNotification(registerRequest.getEmail(), subject, body);


        return ResponseEntity.ok("Registration request sent. Please verify your email and wait for admin approval.");
    }


    // Method to send OTP email
    private void sendOTPEmail(String toEmail, String otp, String fromEmail, String accessToken) {
        final String subject = "OTP for Email Verification";
        final String body = "Dear user,\n\nYour OTP for email verification is: " + otp;
        sendEmail(toEmail, subject, body, fromEmail, accessToken);
    }

    private void sendEmail(String toEmail, String subject, String body, String fromEmail, String accessToken) {
        final String fromEmailFormatted = "bug-tracker-server <" + fromEmail + ">";
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth.mechanisms", "XOAUTH2");

        Session session = Session.getInstance(props);
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(fromEmailFormatted));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
            message.setSubject(subject);
            message.setText(body);

            SMTPTransport transport = (SMTPTransport) session.getTransport("smtp");
            transport.connect("smtp.gmail.com", fromEmail, accessToken);
            transport.sendMessage(message, message.getAllRecipients());

            System.out.println("Email sent successfully. Response: " + transport.getLastServerResponse());
            transport.close();
        } catch (MessagingException e) {
            e.printStackTrace();
            System.out.println("Error sending email: " + e.getMessage());
        }
    }
    private void sendUserNotification(String toEmail, String subject, String body) {
        // Assuming 'fromEmail' and 'accessToken' are configured elsewhere
        String fromEmail = "saiyashwanth01@gmail.com"; // Use your actual email
        String accessToken = "yourAccessTokenHere"; // Use your actual access token
        sendEmail(toEmail, subject, body, fromEmail, accessToken);
    }

    private void sendAdminApprovalRequest(User user) {
        User admin = userService.findUserByUsername("admin");
        String adminEmail = admin.getEmail();
        String subject = "New User Registration Request";
        String body = "A new user " + user.getUsername() + " has requested registration. Please review and approve.";
        sendUserNotification(adminEmail, subject, body); // This now sends a properly formatted email
    }



    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOTP(@RequestBody VerifyOTPRequest verifyOTPRequest) {
        String email = verifyOTPRequest.getEmail();
        String otp = verifyOTPRequest.getOtp();

        if (otpMap.containsKey(email) && otpMap.get(email).equals(otp)) {
            otpMap.remove(email); // Remove OTP from the map after successful verification
            // Assuming you have a method to fetch the user by email
            User user = userService.findUserByEmail(email);
            if (user != null) {
                // User is successfully logged in, return user details or a token
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid OTP. Access denied.");
        }
    }

    private String generateOTP() {
        RandomStringGenerator generator = new RandomStringGenerator.Builder()
                .withinRange('0', '9')
                .build();
        return generator.generate(6);
    }




}
