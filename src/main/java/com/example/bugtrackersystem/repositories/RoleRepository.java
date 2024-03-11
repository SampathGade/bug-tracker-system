package com.example.bugtrackersystem.repositories;




import com.example.bugtrackersystem.model.Role;
import com.example.bugtrackersystem.model.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRole(RoleName roleName);
}