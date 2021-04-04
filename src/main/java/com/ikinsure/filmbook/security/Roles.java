package com.ikinsure.filmbook.security;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

import static com.ikinsure.filmbook.security.Permissions.*;

public enum Roles {

    ADMIN(
            FILM_READ,
            FILM_WRITE
    ),
    USER(
            FILM_READ
    );

    private final Set<Permissions> permissions;

    Roles(Permissions... permission) {
        this.permissions = Arrays.stream(permission).collect(Collectors.toSet());
    }

    public Set<Permissions> getPermissions() {
        return permissions;
    }
}
