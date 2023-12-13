package com.csi.rh_project.setup.model;

import jakarta.persistence.*;

@jakarta.persistence.Entity
@Table(name = "roles")
public class Role {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "role_name")
	private String name;



	public Role() {

	}

	public Role(String name) {
		this.name = name;
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

}
