package com.csi.rh_project.RequestLeave.repository;


import com.csi.rh_project.RequestLeave.model.RequestLeave;
import com.csi.rh_project.auth.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RequestLeaveRepository extends JpaRepository<RequestLeave, Long> {
	List<RequestLeave> findRequestLeavesByUserId(User user);

	@Query(value = "SELECT u from RequestLeave u WHERE u.userId.id = :userId and u.userId.role.role <> 'manager'")
	List<RequestLeave> findRequestLeavesByTeamNotmanager(@Param("userId") long userId);

	@Query(value = "SELECT u from RequestLeave u WHERE u.userId.id = :userId and u.userId.role.role <> 'manager' and u.userId.role.role <> 'teamLead'")
	List<RequestLeave> findRequestLeavesByConsultantsOnly(@Param("userId") long userId);

	@Query(value = "SELECT u from RequestLeave u WHERE u.userId.id = :userId and u.leaveType = 'sickLeave' and u.status = 'Validated' ")
	List<RequestLeave> findSickLeavesById(@Param("userId") long userId);
	@Query(value = "SELECT u from RequestLeave u WHERE  u.status = 'Validated' order by u.userId.id")
	List<RequestLeave> findrequestLeavesValidated();
}