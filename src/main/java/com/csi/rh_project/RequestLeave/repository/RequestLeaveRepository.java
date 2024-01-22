package com.csi.rh_project.RequestLeave.repository;

import com.csi.rh_project.RequestLeave.model.RequestLeave;
import com.csi.rh_project.auth.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface RequestLeaveRepository extends JpaRepository<RequestLeave, Long> {
	List<RequestLeave> findRequestLeavesByUserId(User user);
}