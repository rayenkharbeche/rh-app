package com.csi.rh_project.RequestAuthorisation.model;

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

@jakarta.persistence.Entity
@Table(name = "request_authorisation")
public class RequestAuthorisation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private User userId;

    @Column(name = "remote_days")
    private long remoteDays;


    @Column(name = "type")
    private String type;

    @Column(name = "authorisation_startdate")
    private Date authorisationStartDate;

    @Column(name = "authorisation_enddate")
    private Date authorisationEndDate;

    @Column(name = "status")
    private String status;
    @Column(name = "interne_status")
    private String interneStatus;


    public long getRemoteDays() {
        return remoteDays;
    }

    public void setRemoteDays(long remoteDays) {
        this.remoteDays = remoteDays;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }



    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }


    public Date getAuthorisationStartDate() {
        return authorisationStartDate;
    }

    public void setAuthorisationStartDate(Date authorisationStartDate) {
        this.authorisationStartDate = authorisationStartDate;
    }

    public Date getAuthorisationEndDate() {
        return authorisationEndDate;
    }

    public void setAuthorisationEndDate(Date authorisationEndDate) {
        this.authorisationEndDate = authorisationEndDate;
    }



    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getInterneStatus() {
        return interneStatus;
    }

    public void setInterneStatus(String interneStatus) {
        this.interneStatus = interneStatus;
    }


    public RequestAuthorisation(User user_id, String type, Date authorisationStartDate,Date authorisationEndDate,  String status,String interneStatus,long remoteDays) {
        super();
        this.userId = user_id;
        this.type = type;
        this.authorisationStartDate = authorisationStartDate;
        this.authorisationEndDate = authorisationEndDate;
        this.status = status;
        this.interneStatus = interneStatus;
        this.remoteDays = remoteDays;



    }
    public RequestAuthorisation() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }



    @Override
    public String toString() {
        return "authorisation " +
                "[id=" + id + "," +
                "type" + type + "," +
                "status" + status + "," +

                "interne_status" + interneStatus +
                "]";


    }
}