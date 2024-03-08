package com.csi.rh_project.setup.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@jakarta.persistence.Entity
@Table(name = "general_control")
public class GeneralControl {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Setter
	@Column(name = "authorization_max_nbr")
	private Integer authorizationMaxNbr;

	@Setter
	@Column(name = "Remote_day_max")
	private Integer RemoteDayMax;



	public GeneralControl() {

	}


	public Integer getAuthorizationMaxNbr() {
		return authorizationMaxNbr;
	}

	public void setAuthorizationMaxNbr(Integer authorizationMaxNbr) {
		this.authorizationMaxNbr = authorizationMaxNbr;
	}

	public Integer getRemoteDayMax() {
		return RemoteDayMax;
	}

	public void setRemoteDayMax(Integer remoteDayMax) {
		RemoteDayMax = remoteDayMax;
	}

	public GeneralControl(Integer authorizationMaxNbr, Integer remoteDayMax) {
		this.authorizationMaxNbr = authorizationMaxNbr;
		RemoteDayMax = remoteDayMax;
	}

	@Override
	public String toString() {
		return "Tutorial [id=" + id + ", authorizationMaxNbr=" + authorizationMaxNbr + ", RemoteDayMax=" + RemoteDayMax + "]";
	}


}
