package com.csi.rh_project.setup.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@jakarta.persistence.Entity
@Table(name = "holiday")
public class Holiday {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Setter
	@Column(name = "date")
	private String date;

	@Setter
	@Column(name = "country_code")
	private String countryCode;

	@Setter
	@Column(name = "active")
	private Boolean active;

	public Holiday() {

	}


	public Holiday(String date, String countryCode, Boolean active) {
		this.date = date;
		this.countryCode = countryCode;
		this.active = active;
	}

	@Override
	public String toString() {
		return "Tutorial [id=" + id + ", name=" + date + ", country code=" + countryCode + "]";
	}


}
