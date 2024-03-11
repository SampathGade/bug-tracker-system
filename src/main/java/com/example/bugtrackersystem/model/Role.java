package com.example.bugtrackersystem.model;




import com.example.bugtrackersystem.model.enums.RoleName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

@EqualsAndHashCode(callSuper = true)
@Table(name = "roles")
@javax.persistence.Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Role extends Entity {
    @Enumerated(value = EnumType.STRING)
    private RoleName role;
}