package com.csi.rh_project.setup.model;

import com.csi.rh_project.auth.models.User;
import jakarta.persistence.*;

@jakarta.persistence.Entity
@Table(name = "equipments")
public class Equipment {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "equipment_name")
	private String name;
	@Column(name = "equipment_reference")
	private String reference;

	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "user_id")
	private User user;


	public Equipment(String name, String reference, User user) {
		this.name = name;
		this.reference = reference;
		this.user = user;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Equipment() {

	}

	public Equipment(String name,String reference) {
		this.name = name;
		this.reference = reference;
	}

	public long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	public String getReference() {
		return reference;
	}

	public void setReference(String reference) {
		this.reference = reference;
	}


}
