package com.example.bugtrackersystem.controllers;

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
@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    private final AuthService authService;
    private final PasswordEncoder passwordEncoder;

    // Map to store OTPs temporarily
    private Map<String, String> otpMap = new HashMap<>();

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        User user = authService.login(loginRequest.getUsername(), loginRequest.getPassword());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
        String otp = generateOTP();
        otpMap.put(user.getEmail(), otp);
        sendOTPEmail(user.getEmail(), otp, "saiyashwanth01@gmail.com", "ya29.a0Ad52N39hb84PVRLCjlKLf4BBg2WCGHXacxrzVjGfTh7UnCQC5xvpBpeEp-Ibjkn9u7kD-p4XePcTc1G_jhxRfipldjXpI9SygaVHr6eEeEqLbNgmrtzd-aK4J9-vXJ-KtwAg82f9z94HTuOAJOJ-d9ayPf2dAypq5z1wAgaCgYKAVsSARMSFQHGX2MiowqgA-IdoF7qHmBkLMMRYw0173");

        return ResponseEntity.ok(user);
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

        User registeredUser = authService.register(user, passwordEncoder);
        String otp = generateOTP();
        otpMap.put(registerRequest.getEmail(), otp);
        sendOTPEmail(registerRequest.getEmail(), otp, "saiyashwanth01@gmail.com", "ya29.a0Ad52N39hb84PVRLCjlKLf4BBg2WCGHXacxrzVjGfTh7UnCQC5xvpBpeEp-Ibjkn9u7kD-p4XePcTc1G_jhxRfipldjXpI9SygaVHr6eEeEqLbNgmrtzd-aK4J9-vXJ-KtwAg82f9z94HTuOAJOJ-d9ayPf2dAypq5z1wAgaCgYKAVsSARMSFQHGX2MiowqgA-IdoF7qHmBkLMMRYw0173");

        return ResponseEntity.ok(registeredUser);
    }


    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOTP(@RequestBody VerifyOTPRequest verifyOTPRequest) {
        String email = verifyOTPRequest.getEmail();
        String otp = verifyOTPRequest.getOtp();
        if (otpMap.containsKey(email) && otpMap.get(email).equals(otp)) {
            otpMap.remove(email);
            return ResponseEntity.ok("OTP verified. Access granted to dashboard.");
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

    // Method to send OTP email
    private void sendOTPEmail(String toEmail, String otp, String fromEmail, String accessToken) {
        final String fromEmail1 = "bug-tracker-server <saiyashwant01@gmail.com>";
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth.mechanisms", "XOAUTH2");

        Session session = Session.getInstance(props);

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(fromEmail1));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
            message.setSubject("OTP for Email Verification");
            message.setText("Dear user,\n\nYour OTP for email verification is: " + otp);
            SMTPTransport transport = (SMTPTransport) session.getTransport("smtp");
            transport.connect("smtp.gmail.com", fromEmail, accessToken);
            transport.sendMessage(message, message.getAllRecipients());

            System.out.println("Response: " + transport.getLastServerResponse());

            transport.close();
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

}
