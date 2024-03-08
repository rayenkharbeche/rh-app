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

	@Query(value = "SELECT u from RequestLeave u WHERE u.userId.id = :userId and u.userId.role.role <> 'manager' and u.userId.role.role <> 'teamLead' and u.interneStatus in ('tl_validated_inactive','inactive')")
	List<RequestLeave> findRequestLeavesCanceledByConsultantsOnly(@Param("userId") long userId);

	@Query(value = "SELECT u from RequestLeave u WHERE u.userId.id = :userId  and u.interneStatus in ('tl_validated_inactive','inactive')")
	List<RequestLeave> findRequestLeavesCanceledByConsultants(@Param("userId") long userId);

	@Query(value = "SELECT u from RequestLeave u WHERE u.userId.id = :userId and u.userId.role.role <> 'manager' and u.interneStatus in ('tl_validated_inactive','inactive')")
	List<RequestLeave> findRequestLeavesCanceledByTeamNotmanager(@Param("userId") long userId);

	@Query(value = "SELECT u from RequestLeave u WHERE u.userId.id = :userId and u.userId.role.role <> 'manager' and u.userId.role.role <> 'teamLead'")
	List<RequestLeave> findRequestLeavesByConsultantsOnly(@Param("userId") long userId);

	@Query(value = "SELECT u from RequestLeave u WHERE u.userId.id = :userId")
	List<RequestLeave> findRequestLeavesByConsultants(@Param("userId") long userId);

	@Query(value = "SELECT u from RequestLeave u WHERE u.userId.role.role in ('manager', 'Infra' , 'Rh' , 'treasurer' ) ")
	List<RequestLeave> findRequestLeavesManager();

	@Query(value = "SELECT u from RequestLeave u WHERE u.userId.role.role in ('manager', 'Infra' , 'Rh' , 'treasurer' ) and u.interneStatus ='inactive'")
	List<RequestLeave> findRequestLeavesCanceledByManagersOnly(@Param("userId") long userId);

	@Query(value = "SELECT u from RequestLeave u WHERE u.userId.id = :userId and u.leaveType = 'sickLeave' and u.status = 'Validated' ")
 	List<RequestLeave> findSickLeavesById(@Param("userId") long userId);

	@Query(value = "SELECT u from RequestLeave u WHERE u.leaveType = 'sickLeave' and u.status = 'Validated' ")
	List<RequestLeave> findSickLeaves();

	@Query(value = "SELECT u from RequestLeave u WHERE  u.status = 'Validated' order by u.userId.id")
	List<RequestLeave> findrequestLeavesValidated();

	@Query(value = "SELECT sum (u.leaveDays) from RequestLeave u WHERE u.userId.id = :userId and u.leaveType = 'sickLeave' and u.status = 'Validated' ")
	Double findSickLeavesDaysById(@Param("userId") long userId);
	@Query(value = "SELECT sum (u.leaveDays) from RequestLeave u WHERE month(u.startDate) = :month and u.userId.id = :userId and u.leaveType = :type and u.status = 'Validated' ")
	Double findLeavesDaysBymonthbyid(@Param("userId") long userId,@Param("month") long month,@Param("type") String type );
	@Query(value = "SELECT sum (u.leaveDays) from RequestLeave u WHERE month(u.startDate) = :month  and u.leaveType = :type and u.status = 'Validated' ")
	Double findLeavesDaysBymonth(@Param("month") long month,@Param("type") String type );

	@Query(value = "SELECT sum (u.leaveDays) from RequestLeave u WHERE u.status = :status and u.userId.id = :userId")
	Double findLeavesDaysBstatusbyid(@Param("userId") long userId,@Param("status") String status);
	@Query(value = "SELECT sum (u.leaveDays) from RequestLeave u WHERE u.status = :status")
	Double findLeavesDaysBstatus(@Param("status") String status);

	@Query(value = "SELECT count(u) from RequestLeave u WHERE u.userId.id =:userId and u.userId.actif = true and Date(u.startDate) = DATE( NOW() ) and u.status = 'Validated'")
	double findLeavesDaystoday(@Param("userId") long userId);
}