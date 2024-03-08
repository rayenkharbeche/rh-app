package com.csi.rh_project.RequestEquipment.model;

import java.util.Date;

import com.csi.rh_project.auth.models.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


@jakarta.persistence.Entity
@Table(name = "requestequipment")
public class RequestEquipment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private User userId;

    @Column(name = "type")
    private String type;


    @Column(name = "equipment_name")
    private String equipmentName;
    @Column(name = "remarks")
    private String remarks;

    public String getEquipmentName() {
        return equipmentName;
    }

    public void setEquipmentName(String equipmentName) {
        this.equipmentName = equipmentName;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEquipmentRef() {
        return equipmentRef;
    }

    public RequestEquipment(User userId, String type, String status) {
        this.userId = userId;
        this.type = type;
        this.status = status;
    }

    public RequestEquipment(User userId, String type, String equipmentName, String status) {
        this.userId = userId;
        this.type = type;
        this.equipmentName = equipmentName;
        this.status = status;
    }

    public RequestEquipment(User userId, String type, String equipmentName, String remarks, String equipmentRef, String status) {
        this.userId = userId;
        this.type = type;
        this.equipmentName = equipmentName;
        this.remarks = remarks;
        this.equipmentRef = equipmentRef;
        this.status = status;
    }

    public void setEquipmentRef(String equipmentRef) {
        this.equipmentRef = equipmentRef;
    }

    @Column(name = "equipment_ref")
    private String equipmentRef;


    @UpdateTimestamp
    @Column(name = "update_date")
    private Date updateDate;


    @Column(name = "status")
    private String status;

    public String getInterneStatus() {
        return interneStatus;
    }

    public void setInterneStatus(String interneStatus) {
        this.interneStatus = interneStatus;
    }

    @Column(name = "interne_status")
    private String interneStatus;

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;



    public RequestEquipment() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }






    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }



    @Override
    public String toString() {
        return "RequestEquipment [id=" + id + ", type=" + type +
                "equipmentRef=" + equipmentRef + ", creation_date=" + createdAt +
                "user_id=" + userId +

                "]";


    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }




}