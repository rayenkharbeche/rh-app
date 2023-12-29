package com.csi.rh_project.auth.dtos;

import com.csi.rh_project.auth.models.Role;

public class RegisterUserDto {
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private Role role;

    public String getEmail() {
        return email;
    }

    public RegisterUserDto setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public RegisterUserDto setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getFirstname() {
        return firstname;
    }
    public String getLastname() {
        return lastname;
    }


    public RegisterUserDto setFirstName(String firstname) {
        this.firstname = firstname;
        return this;
    }
    public RegisterUserDto setLastName(String lastname) {
        this.lastname = lastname;
        return this;
    }
    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
    @Override
    public String toString() {
        return "RegisterUserDto{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", role='" + role + '\'' +


                '}';
    }


}
