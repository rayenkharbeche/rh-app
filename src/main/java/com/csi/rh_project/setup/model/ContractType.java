package com.csi.rh_project.setup.model;

import jakarta.persistence.*;

@jakarta.persistence.Entity
@Table(name = "contracts")
public class ContractType {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "contract_name")
	private String name;



	public ContractType() {

	}

	public ContractType(String name) {
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
