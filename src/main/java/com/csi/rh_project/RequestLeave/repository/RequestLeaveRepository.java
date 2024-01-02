package com.csi.rh_project.RequestLeave.repository;

import com.csi.rh_project.RequestAuthorization.model.RequestAuthorization;
import com.csi.rh_project.RequestLeave.model.RequestLeave;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface RequestLeaveRepository extends JpaRepository<RequestLeave, Long> {
	@Query("select r from RequestLeave r where r.userId = ?1")
	List<RequestLeave> findByByEmployeeId(long UserId);
}