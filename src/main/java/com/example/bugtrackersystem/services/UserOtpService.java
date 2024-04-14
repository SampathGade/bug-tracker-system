package com.example.bugtrackersystem.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

import com.example.bugtrackersystem.Entity.UserOtp;
import com.example.bugtrackersystem.repositories.UserOtpRepository;
import com.example.bugtrackersystem.services.emailSender.EmailService;
import com.example.bugtrackersystem.services.emailSender.EmailServiceImpl;

@Service
public class UserOtpService {

    @Value("${otp.expiry.minutes:10}")
    private int otpExpiryMinutes;

    private final UserOtpRepository userOtpRepository;

    private EmailService emailService;

    @Autowired
    public UserOtpService(UserOtpRepository userOtpRepository, EmailServiceImpl emailService) {
        this.userOtpRepository = userOtpRepository;
        this.emailService = emailService;
    }

    public UserOtp generateOtp(String userEmail) {
        // Deactivate any existing active OTP for the same userId
        deactivateActiveOtpForUser(userEmail);

        // Generate new OTP
        String otp = generateRandomOtp();
        LocalDateTime createdAt = LocalDateTime.now();
        LocalDateTime expiresAt = createdAt.plusMinutes(otpExpiryMinutes);
        UserOtp userOtp = new UserOtp(null,userEmail, otp, createdAt, expiresAt, true);
//        emailService.sendMailToUser(userEmail, otp);
        return userOtpRepository.save(userOtp);
    }

    private void deactivateActiveOtpForUser(String userId) {
        UserOtp existingActiveOtp = userOtpRepository.findByUserEmailAndActive(userId, true);
        if (existingActiveOtp != null) {
            existingActiveOtp.setActive(false);
            userOtpRepository.save(existingActiveOtp);
        }
    }

    public boolean validateOtp(String userEmail, String otp) {
        UserOtp userOtp = userOtpRepository.findByUserEmailAndActive(userEmail, true);
        if (userOtp != null && userOtp.isActive() && userOtp.getOtp().equals(otp)) {
            LocalDateTime currentTime = LocalDateTime.now();
            if (currentTime.isBefore(userOtp.getExpiresAt())) {
                userOtp.setActive(false);
                userOtpRepository.save(userOtp);
                return true;
            } else {
                // OTP has expired
                userOtp.setActive(false);
                userOtpRepository.save(userOtp);
            }
        }
        return false;
    }

    private String generateRandomOtp() {
        Random random = new Random();
        int otpValue = 100000 + random.nextInt(900000);
        return String.valueOf(otpValue);
    }
}

