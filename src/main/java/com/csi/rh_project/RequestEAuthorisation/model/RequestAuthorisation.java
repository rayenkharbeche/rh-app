package com.csi.rh_project.RequestEAuthorisation.model;

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

    @Column(name = "type")
    private String type;


    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        type = type;
    }




    public Date getAuthorisationDate() {
		return authorisationDate;
	}

	public void setAuthorisationDate(Date authorisationDate) {
		this.authorisationDate = authorisationDate;
	}

	public String getStatutDemande() {
		return statutDemande;
	}

	public void setStatutDemande(String statutDemande) {
		this.statutDemande = statutDemande;
	}




	@Column(name = "authorisation_date")
    private Date authorisationDate;


    @Column(name = "statut_demande")
    private String statutDemande;
    public RequestAuthorisation(User user_id, String Type, Date AuthorisationDate, String statutDemande) {
        super();
        this.userId = user_id;
        this.type = Type;
        this.authorisationDate = AuthorisationDate;
        this.statutDemande = statutDemande;

    }
    public RequestAuthorisation() {
        super();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }



    @Override
    public String toString() {
        return "Tutorial [id=" + id + ", name=" +"]";


    }
}