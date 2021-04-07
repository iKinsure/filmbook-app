package com.ikinsure.filmbook.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

import static com.ikinsure.filmbook.security.Permission.*;

public enum Role {

    ADMIN(
            FILM_READ,
            FILM_WRITE
    ),
    USER(
            FILM_READ
    );

    private final Set<Permission> permissions;

    Role(Permission... permission) {
        this.permissions = Arrays.stream(permission).collect(Collectors.toSet());
    }

    public Set<Permission> getPermissions() {
        return permissions;
    }

    public Set<GrantedAuthority> getAuthorities() {
        return permissions.stream()
                .map(p -> new SimpleGrantedAuthority(p.name()))
                .collect(Collectors.toSet());
    }
}
