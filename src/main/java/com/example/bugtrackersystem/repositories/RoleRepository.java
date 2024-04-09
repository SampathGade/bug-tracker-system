package com.example.bugtrackersystem.repositories;

import com.example.bugtrackersystem.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoleRepository extends MongoRepository<Role, String> {
    // Example custom query method
    Role findByRole(String roleName);
}
