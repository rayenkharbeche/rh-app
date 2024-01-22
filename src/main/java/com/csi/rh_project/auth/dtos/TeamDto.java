package com.csi.rh_project.auth.dtos;

import com.csi.rh_project.setup.model.Department;

public class TeamDto {
    private Department department;
    private String name;

    public TeamDto(Department department, String name) {
        this.department = department;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public Department getDepartment() {
        return department;
    }



    @Override
    public String toString() {
        return "TeamDto{" +
                "department='" + department + '\'' +
                ", name='" + name + '\'' +

                '}';
    }




    public void setDepartment(Department department) {
        this.department = department;
    }

    public TeamDto(){

    }


    public void setName(String name) {
        this.name = name;
    }
}
