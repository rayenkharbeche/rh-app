package com.csi.rh_project.setup.model;

import jakarta.persistence.*;

@jakarta.persistence.Entity
@Table(name = "entities")
public class Entity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "entity_name")
	private String name;

	@Column(name = "country_code")
	private String countryCode;



	public Entity() {

	}

	public Entity(String name, String countryCode) {
		this.name = name;
		this.countryCode = countryCode;
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

	public String getCountryCode() {
		return countryCode;
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}


	@Override
	public String toString() {
		return "Tutorial [id=" + id + ", name=" + name + ", country code=" + countryCode + "]";
	}

}
