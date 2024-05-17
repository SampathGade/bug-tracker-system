package com.example.bugtrackersystem.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.bugtrackersystem.entity.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);

    User findByEmailAndStatus(String email, String status);

    List<User> findByStatus(String  status);

    List<User> findByStatusAndProjectManager(String status, String projectManager);

    List<User> findByRole(String role);

    List<User> findByRoleAndStatus(String role, String staus);

    @Query("{'role': {$in: ?0}}")
    List<User> findByRoles(List<String> roles);

    @Query("{ 'email': ?2, 'sessions': { '$elemMatch': { 'ip': ?0, 'validUpTo': { '$gte': ?1 }, 'otpValidated': true } } }")
    User findBySessionIpAndSessionValidUpToAndEmail(String ip, Date validUpTo, String email);
}

