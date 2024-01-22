package com.csi.rh_project.setup.model;

import com.csi.rh_project.auth.models.Image;
import com.csi.rh_project.auth.models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@jakarta.persistence.Entity
@Table(name = "teams")
public class Team {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Setter
	@Column(name = "team_name")
	private String name;


	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "department_id")
	private Department department;




	/*@OneToMany(mappedBy = "team", fetch = FetchType.LAZY,
			cascade = CascadeType.ALL)
	private Set<User> consultant;*/
	public void setName(String name) {
		this.name = name;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}


	/*public void setConsultant(Set<User> consultant) {
		this.consultant = consultant;
	}
*/


	public Team() {

	}

	public Team(String name, Department department) {
		this.name = name;
		this.department = department;

	}


	@Override
	public String toString() {
		return "Team [id=" + id + ", " +
				"name=" + name + ", " +
				"department=" + department + "]";

	}


}
