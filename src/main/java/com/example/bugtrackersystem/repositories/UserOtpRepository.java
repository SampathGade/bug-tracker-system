package com.example.bugtrackersystem.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.bugtrackersystem.Entity.UserOtp;

public interface UserOtpRepository extends MongoRepository<UserOtp, String> {
    UserOtp findByUserId(String userId);
    UserOtp findByUserIdAndActive(String userId, Boolean active);
}
