package com.csi.rh_project.AdministrativeRequest.model;

import com.csi.rh_project.auth.models.User;
import jakarta.persistence.*;

@jakarta.persistence.Entity
@Table(name = "requestAdministrative")
public class RequestAdministrative {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private User userId;


    public RequestAdministrative(User userId,  String type) {
        super();
        this.userId = userId;

        this.type = type;
    }

    @Column(name = "type")
    private String type;

    public RequestAdministrative() {
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


    @Override
    public String toString() {
        return "Tutorial [id=" + id + ", name=" +"]";


    }
}
