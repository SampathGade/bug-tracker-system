package com.example.bugtrackersystem.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.bugtrackersystem.Entity.UserOtp;

public interface UserOtpRepository extends MongoRepository<UserOtp, String> {
    UserOtp findByUserEmail(String userEmail);
    UserOtp findByUserEmailAndActive(String userEmail, Boolean active);
}
