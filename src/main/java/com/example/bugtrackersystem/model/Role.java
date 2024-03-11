package com.example.bugtrackersystem.model;

import com.example.bugtrackersystem.model.enums.RoleName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "roles")
public class Role {
    @Id
    private String id;

    private RoleName role;

    public String getName() {
        return role.name();
    }

    public Role(RoleName role) {
        this.role = role;
    }
}
