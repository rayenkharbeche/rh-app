package com.csi.rh_project.auth.dtos;

public class TokenUserDto {
    private String token;
    private String password;



    public String getToken() {
        return token;
    }
    public String getPassword() {
        return password;
    }

    public TokenUserDto setToken(String token) {
        this.token = token;
        return this;
    }

    public TokenUserDto setPassword(String password) {
        this.password = password;
        return this;
    }

    @Override
    public String toString() {
        return "LoginUserDto{" +
                "token='" + token + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
