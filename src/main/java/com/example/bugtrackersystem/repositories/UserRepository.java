package com.example.bugtrackersystem.repositories;

import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByUsername(String username);
    Optional<Object> findByEmail(String email);
}
