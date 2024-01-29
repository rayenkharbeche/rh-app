package com.csi.rh_project.auth.dtos;

import com.csi.rh_project.auth.models.Image;
import com.csi.rh_project.auth.models.Role;
import com.csi.rh_project.setup.model.Department;
import com.csi.rh_project.setup.model.Entity;


import java.util.Date;

public class UpdateUserDto {
    private String email;
    private String password;

    private Date contractStartDate;
    private Date birthdayDate;

    private String firstname;
    private String lastname;
    private Role role;
    private Entity entity;

    private Department department;
    private Image image;


    private double leaveCredit;

    private double rttCredit;

    public double getRttCredit() {
        return rttCredit;
    }

    public void setRttCredit(double rttCredit) {
        this.rttCredit = rttCredit;
    }

    private boolean actif;

    public boolean isActif() {
        return actif;
    }

    public void setActif(boolean actif) {
        actif = actif;
    }

    public double getLeaveCredit() {
        return leaveCredit;
    }

    public void setLeaveCredit(double leaveCredit) {
        this.leaveCredit = leaveCredit;
    }

    public Date getContractStartDate() {
        return contractStartDate;
    }

    public void setContractStartDate(Date contractStartDate) {
        this.contractStartDate = contractStartDate;
    }

    public Date getBirthdayDate() {
        return birthdayDate;
    }

    public void setBirthdayDate(Date birthdayDate) {
        this.birthdayDate = birthdayDate;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Entity getEntity() {
        return entity;
    }

    public void setEntity(Entity entity) {
        this.entity = entity;
    }



    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }


    public String getEmail() {
        return email;
    }

    public UpdateUserDto setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public UpdateUserDto setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getFirstname() {
        return firstname;
    }
    public String getLastname() {
        return lastname;
    }


    public UpdateUserDto setFirstName(String firstname) {
        this.firstname = firstname;
        return this;
    }
    public UpdateUserDto setLastName(String lastname) {
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
