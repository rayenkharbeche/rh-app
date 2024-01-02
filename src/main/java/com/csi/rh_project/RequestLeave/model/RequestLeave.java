package com.csi.rh_project.RequestLeave.model;

import java.util.Date;

import com.csi.rh_project.auth.models.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
@jakarta.persistence.Entity
@Table(name = "requestLeave")
public class RequestLeave {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private User userId;

    @Column(name = "leave_type")
    private String leaveType;
    @Column(name = "leave_balance")
    private long leaveBalance;
    @Column(name = "update_date")
    private Date updateDate;


    @Column(name = "statut_demande")
    private String statutDemande;
    public RequestLeave(User user_id, String leaveType, Date updateDate, long leaveBalance,
                        String statutDemande) {
        super();
        this.userId = user_id;
        this.leaveType = leaveType;
        this.updateDate = updateDate;
        this.leaveBalance = leaveBalance;
        this.statutDemande = statutDemande;
    }
    public RequestLeave() {
        super();
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

    public String getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(String leaveType) {
        this.leaveType = leaveType;
    }

    public long getLeaveBalance() {
        return leaveBalance;
    }

    public void setLeaveBalance(long leaveBalance) {
        this.leaveBalance = leaveBalance;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public String getStatutDemande() {
        return statutDemande;
    }

    public void setStatutDemande(String statutDemande) {
        this.statutDemande = statutDemande;
    }

    @Override
    public String toString() {
        return "Tutorial [id=" + id + ", name=" +"]";


    }
}