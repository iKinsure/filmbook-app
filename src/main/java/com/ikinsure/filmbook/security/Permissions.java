package com.ikinsure.filmbook.security;

public enum Permissions {

    FILM_READ("film:read"),
    FILM_WRITE("film:write");

    private final String permission;

    Permissions(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
