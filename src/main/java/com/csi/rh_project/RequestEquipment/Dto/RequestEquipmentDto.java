package com.csi.rh_project.RequestEquipment.Dto;

import com.csi.rh_project.auth.models.User;

public class RequestEquipmentDto {

    private String equipmentName;
    private String equipmentRef;
    private String interneStatus;
    private User userId;
    private String status;

    public String getStatus() {
        return status;
    }

    public User getUserId() {
        return userId;
    }

    private Boolean exist;

    public String getEquipmentName() {
        return equipmentName;
    }

    public String getEquipmentRef() {
        return equipmentRef;
    }

    public String getInterneStatus() {
        return interneStatus;
    }

    public Boolean getExist() {
        return exist;
    }
}
