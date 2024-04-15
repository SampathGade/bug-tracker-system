package com.example.bugtrackersystem.services.Authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import org.springframework.security.crypto.password.PasswordEncoder;
import java.time.LocalDateTime;
import java.util.Random;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.example.bugtrackersystem.entity.User;
import com.example.bugtrackersystem.repository.UserRepository;
import com.example.bugtrackersystem.services.EmailSender.EmailSender;

@Service
public class AuthenticationService {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailSender emailService;

//    @Autowired
//    private PasswordEncoder passwordEncoder;

    public boolean checkCredentials(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && (password.equals(user.getPassword()))) {
            logger.info("Credentials are valid for email: {}", email);
            return true;
        }
        logger.warn("Invalid login attempt for email: {}", email);
        return false;
    }

    public void generateAndSendOtp(String email) {
        User user = userRepository.findByEmail(email);
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(10));
        userRepository.save(user);
//        emailService.sendOtpEmail(email, otp);
        logger.info("OTP generated and sent to email: {}", email);
    }

    public boolean validateOtp(String email, String otp) {
        User user = userRepository.findByEmail(email);
        if (user != null && otp.equals(user.getOtp()) && user.getOtpExpiry().isAfter(LocalDateTime.now())) {
            user.setOtp(null);
            userRepository.save(user);
            logger.info("OTP validated for email: {}", email);
            return true;
        }
        logger.warn("Invalid OTP attempt for email: {}", email);
        return false;
    }

    public void createUser(String email , String password, String role){
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);
        user.setStatus("Review Pending");
        userRepository.save(user);
        //need to write logic to send the request Email to admin
    }
}

