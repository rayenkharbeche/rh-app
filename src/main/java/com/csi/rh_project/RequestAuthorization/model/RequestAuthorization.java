package com.csi.rh_project.RequestAuthorization.model;

import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.setup.model.Employe;
import jakarta.persistence.*;

import java.util.Date;

@jakarta.persistence.Entity
@Table(name = "requestAuthorisation")
public class RequestAuthorization {



        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private long id;

        @ManyToOne(optional=false)
        @JoinColumn(name="employee_id",insertable = false, updatable = false)
        User employee;

        @Column(name = "type")
        private String type;

        @Column(name = "closing_date")
        private Date closingDate;

    @Column(name = "authorisation_date")
    private Date authorisation_Date;

        @Column(name = "traitement_date")
        private Date traitementDate;

        @Column(name = "create_date")
        private Date createDate;

        @Column(name = "statut_demande")
        private String statutDemande;

    public RequestAuthorization() {

    }



        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }
        public Date getClosingDate() {
            return closingDate;
        }

        public void setClosingDate(Date closingDate) {
            this.closingDate = closingDate;
        }

        public Date getTraitementDate() {
            return traitementDate;
        }

        public void setTraitementDate(Date traitementDate) {
            this.traitementDate = traitementDate;
        }

        public Date getCreateDate() {
            return createDate;
        }

        public void setCreateDate(Date createDate) {
            this.createDate = createDate;
        }

        public String getStatutDemande() {
            return statutDemande;
        }

        public void setStatutDemande(String statutDemande) {
            this.statutDemande = statutDemande;
        }



        public RequestAuthorization(User employee, String type, Date closingDate, Date traitementDate, Date createDate,
                       String statutDemande) {
            super();
            this.employee = employee;
            this.type = type;
            this.closingDate = closingDate;
            this.traitementDate = traitementDate;
            this.createDate = createDate;
            this.statutDemande = statutDemande;
        }


    public Date getAuthorisation_Date() {
        return authorisation_Date;
    }

    public void setAuthorisation_Date(Date authorisation_Date) {
        this.authorisation_Date = authorisation_Date;
    }
}



