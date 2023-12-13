package com.csi.rh_project.setup.model;

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
