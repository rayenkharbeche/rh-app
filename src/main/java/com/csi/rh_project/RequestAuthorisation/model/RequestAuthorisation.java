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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Column(name = "type")
    private String type;


    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }


    public Date getAuthorisationDate() {
		return authorisationDate;
	}

	public void setAuthorisationDate(Date authorisationDate) {
		this.authorisationDate = authorisationDate;
	}





	@Column(name = "authorisation_date")
    private Date authorisationDate;


    @Column(name = "status")
    private String status;
    @Column(name = "interne_status")
    private String interneStatus;

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


    public RequestAuthorisation(User user_id, String type, Date AuthorisationDate, String status,String interneStatus) {
        super();
        this.userId = user_id;
        this.type = type;
        this.authorisationDate = AuthorisationDate;
        this.status = status;
        this.interneStatus = interneStatus;


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