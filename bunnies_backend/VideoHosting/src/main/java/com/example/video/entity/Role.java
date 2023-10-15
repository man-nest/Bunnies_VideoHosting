package com.example.video.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Role implements BaseEntity, GrantedAuthority {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false, updatable = false)
    private String authority;

    public String getAuthority() {
        return "ROLE_" + authority;
    }

}