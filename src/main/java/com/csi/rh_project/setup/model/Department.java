package com.csi.rh_project.setup.model;

import jakarta.persistence.*;

@jakarta.persistence.Entity
@Table(name = "departments")
public class Department {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "department_name")
	private String name;



	public Department() {

	}

	public Department(String name) {
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
