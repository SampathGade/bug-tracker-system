package com.example.bugtrackersystem.controllers;

import com.example.bugtrackersystem.model.User;
import com.example.bugtrackersystem.requests.LoginRequest;
import com.example.bugtrackersystem.requests.RegisterRequest;
import com.example.bugtrackersystem.requests.VerifyOTPRequest;
import com.example.bugtrackersystem.services.AuthService;
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
        // Check if user exists and password matches
        User user = authService.login(loginRequest.getUsername(), loginRequest.getPassword());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        // Generate and send OTP
        String otp = generateOTP();
        otpMap.put(user.getEmail(), otp);
        sendOTPEmail(user.getEmail(), otp, "your-email@gmail.com", "your-email-password");

        return ResponseEntity.ok("OTP sent to your email");
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Application in Good Health");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        // Create a new user object from the register request
        User user = new User(registerRequest.getUsername(),
                registerRequest.getPassword(),
                registerRequest.getEmail());

        // Register the user with encoded password
        User registeredUser = authService.register(user, passwordEncoder);

        // Generate OTP
        String otp = generateOTP();

        // Store the OTP in the map with the user's email as the key
        otpMap.put(registerRequest.getEmail(), otp);
        sendOTPEmail(registerRequest.getEmail(), otp, "your-email@gmail.com", "your-email-password");

        return ResponseEntity.ok(registeredUser);
    }


    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOTP(@RequestBody VerifyOTPRequest verifyOTPRequest) {
        String email = verifyOTPRequest.getEmail();
        String otp = verifyOTPRequest.getOtp();

        // Check if OTP is valid
        if (otpMap.containsKey(email) && otpMap.get(email).equals(otp)) {
            // Remove OTP from map after successful verification
            otpMap.remove(email);
            return ResponseEntity.ok("OTP verified. Access granted to dashboard.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid OTP. Access denied.");
        }
    }

    // Method to generate OTP
    private String generateOTP() {
        RandomStringGenerator generator = new RandomStringGenerator.Builder()
                .withinRange('0', '9')
                .build();
        return generator.generate(6); // Generate a 6-digit OTP
    }

    // Method to send OTP email
    private void sendOTPEmail(String email, String otp, String username, String password) {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com"); // or your SMTP server host
        props.put("mail.smtp.port", "587"); // or your SMTP server port

        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
            message.setSubject("OTP for Email Verification");
            message.setText("Dear user,\n\nYour OTP for email verification is: " + otp);

            Transport.send(message);

            System.out.println("OTP sent to: " + email);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
