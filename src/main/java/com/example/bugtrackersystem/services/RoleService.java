package com.example.bugtrackersystem.services;





import com.example.bugtrackersystem.exceptions.EntityNotFoundException;
import com.example.bugtrackersystem.model.Role;
import com.example.bugtrackersystem.model.enums.RoleName;
import com.example.bugtrackersystem.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;

    public Role findByRoleName(RoleName roleName){
        return roleRepository.findByRole(roleName)
                .orElseThrow(
                        () -> new EntityNotFoundException("Role " + roleName.name() + " doesn't exist")
                );
    }
}