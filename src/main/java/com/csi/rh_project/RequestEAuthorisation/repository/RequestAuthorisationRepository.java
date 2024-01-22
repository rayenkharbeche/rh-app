package com.csi.rh_project.RequestEAuthorisation.repository;

import com.csi.rh_project.RequestEAuthorisation.model.RequestAuthorisation;
import com.csi.rh_project.auth.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestAuthorisationRepository extends JpaRepository<RequestAuthorisation, Long> {
	List<RequestAuthorisation> findRequestAuthorisationByUserId(User user);
}