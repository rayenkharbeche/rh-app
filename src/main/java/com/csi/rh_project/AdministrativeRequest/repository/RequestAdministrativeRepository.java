package com.csi.rh_project.AdministrativeRequest.repository;

import com.csi.rh_project.AdministrativeRequest.model.RequestAdministrative;
import com.csi.rh_project.auth.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestAdministrativeRepository extends JpaRepository<RequestAdministrative, Long> {
	List<RequestAdministrative> findRequestAdministrativeByUserId(User user);
}