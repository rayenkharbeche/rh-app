package com.csi.rh_project.setup.model;

import com.csi.rh_project.auth.models.User;
import jakarta.persistence.*;

import java.util.Collection;

@jakarta.persistence.Entity
@Table(name = "positions")
public class Position {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "position_name")
	private String name;



	public Position() {

	}

	public Position(String name) {
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

	@OneToMany(mappedBy = "poste")
	private Collection<User> user;

	public Collection<User> getUser() {
		return user;
	}

	public void setUser(Collection<User> user) {
		this.user = user;
	}
}
