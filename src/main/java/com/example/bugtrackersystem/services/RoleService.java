package com.example.bugtrackersystem.services;

import com.example.bugtrackersystem.exceptions.EntityNotFoundException;
import com.example.bugtrackersystem.model.Role;
import com.example.bugtrackersystem.model.enums.RoleName;
import com.example.bugtrackersystem.repositories.MongoDBManager;
import org.bson.Document;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    public Role findByRoleName(RoleName roleName) {
        String roleNameString = roleName.name(); // Convert RoleName enum to String
        Document roleDocument = MongoDBManager.findRoleByName(roleNameString);
        if (roleDocument == null) {
            throw new EntityNotFoundException("Role " + roleName.name() + " not found");
        }
        return documentToRole(roleDocument);
    }

    // Helper method to convert Document to Role object
    private Role documentToRole(Document document) {
        Role role = new Role();
        role.setId(document.getString("_id"));
        role.setRole(RoleName.valueOf(document.getString("role")));
        // Set other fields as needed
        return role;
    }
}
