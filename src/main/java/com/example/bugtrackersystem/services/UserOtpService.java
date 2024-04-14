package com.example.bugtrackersystem.services;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

import com.example.bugtrackersystem.Entity.UserOtp;
import com.example.bugtrackersystem.repositories.UserOtpRepository;

@Service
public class UserOtpService {

    @Value("${otp.expiry.minutes:10}")
    private int otpExpiryMinutes;

    private final UserOtpRepository userOtpRepository;

    public UserOtpService(UserOtpRepository userOtpRepository) {
        this.userOtpRepository = userOtpRepository;
    }

    public UserOtp generateOtp(String userId) {
        // Deactivate any existing active OTP for the same userId
        deactivateActiveOtpForUser(userId);

        // Generate new OTP
        String otp = generateRandomOtp();
        LocalDateTime createdAt = LocalDateTime.now();
        LocalDateTime expiresAt = createdAt.plusMinutes(otpExpiryMinutes);
        UserOtp userOtp = new UserOtp(null,userId, otp, createdAt, expiresAt, true);
        return userOtpRepository.save(userOtp);
    }

    private void deactivateActiveOtpForUser(String userId) {
        UserOtp existingActiveOtp = userOtpRepository.findByUserIdAndActive(userId, true);
        if (existingActiveOtp != null) {
            existingActiveOtp.setActive(false);
            userOtpRepository.save(existingActiveOtp);
        }
    }

    public boolean validateOtp(String userId, String otp) {
        UserOtp userOtp = userOtpRepository.findByUserId(userId);
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

