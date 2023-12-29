package com.csi.rh_project.setup.model;

import com.csi.rh_project.auth.models.User;
import jakarta.persistence.*;

import java.util.Collection;

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

	@OneToMany(mappedBy = "department")
	private Collection<User> user;

	public Collection<User> getUser() {
		return user;
	}

	public void setUser(Collection<User> user) {
		this.user = user;
	}
}
