package com.csi.rh_project.setup.model;

import com.csi.rh_project.auth.models.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Collection;

@Getter
@jakarta.persistence.Entity
@Table(name = "entities")
public class Entity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Setter
	@Column(name = "entity_name")
	private String name;

	@Setter
	@Column(name = "country_code")
	private String countryCode;



	public Entity() {

	}

	public Entity(String name, String countryCode) {
		this.name = name;
		this.countryCode = countryCode;
	}


	@Override
	public String toString() {
		return "Tutorial [id=" + id + ", name=" + name + ", country code=" + countryCode + "]";
	}


}
