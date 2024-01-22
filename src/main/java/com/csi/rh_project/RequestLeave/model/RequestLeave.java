package com.csi.rh_project.RequestLeave.model;

import java.util.Date;

import com.csi.rh_project.auth.models.User;
import com.fasterxml.jackson.annotation.JsonFormat;
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
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

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


    @UpdateTimestamp
    @Column(name = "update_date")
    private Date updateDate;

    @Column(name = "start_date")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date startDate;
    @Column(name = "end_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date endDate;
    @Column(name = "status")
    private String status;

    @Column(name = "interne_status")
    private String interneStatus;

    public String getInterneStatus() {
        return interneStatus;
    }

    public void setInterneStatus(String interneStatus) {
        this.interneStatus = interneStatus;
    }

    @OneToOne(cascade = CascadeType.ALL)
    private FileDB fileDB;


    public RequestLeave(User user_id, String leaveType, Date updateDate, long leaveBalance,
                        String status,String interneStatus,Date startDate, Date endDate) {
        super();
        this.userId = user_id;
        this.leaveType = leaveType;
        this.leaveBalance = leaveBalance;
        this.status = status;
        this.interneStatus = interneStatus;


        this.updateDate = updateDate;
        this.startDate = startDate;
        this.endDate = endDate;



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



    @Override
    public String toString() {
        return "RequestLeave [id=" + id + ", leaveType=" + leaveType +
                "start_date=" + startDate + ", end_date=" + endDate+
                "user_id=" + userId +

                "]";


    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public FileDB getFileDB() {
        return fileDB;
    }

    public void setFileDB(FileDB fileDB) {
        this.fileDB = fileDB;
    }
}