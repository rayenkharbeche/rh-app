package com.csi.rh_project.RequestAuthorisation.repository;

import com.csi.rh_project.RequestAuthorisation.model.RequestAuthorisation;
import com.csi.rh_project.RequestLeave.model.RequestLeave;
import com.csi.rh_project.auth.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RequestAuthorisationRepository extends JpaRepository<RequestAuthorisation, Long> {
	List<RequestAuthorisation> findRequestAuthorisationByUserId(User user);


	@Query(value = "SELECT u from RequestAuthorisation u WHERE u.userId.id = :userId and u.userId.role.role <> 'manager'")
	List<RequestAuthorisation> findRequestLeavesByTeamNotmanager(@Param("userId") long userId);

	@Query(value = "SELECT u from RequestAuthorisation u WHERE u.userId.id = :userId and u.userId.role.role <> 'manager' and u.userId.role.role <> 'teamLead'")
	List<RequestAuthorisation> findRequestLeavesByConsultantsOnly(@Param("userId") long userId);
	@Query(value = "SELECT sum (u.remoteDays) from RequestAuthorisation u WHERE u.userId.id = :userId and u.type = 'homeoffice' and u.status = 'Validated' ")
	Double findRemoteDaysById(@Param("userId") long userId);
	@Query(value = "SELECT sum (u.remoteDays) from RequestAuthorisation u WHERE month(u.authorisationStartDate) = :month and u.userId.id = :userId and u.type = 'homeoffice' and u.status = 'Validated' ")
	Double findRemoteDaysBymonthbyid(@Param("userId") long userId,@Param("month") long month);
	@Query(value = "SELECT sum (u.remoteDays) from RequestAuthorisation u WHERE month(u.authorisationStartDate) = :month and u.type = 'homeoffice' and u.status = 'Validated' ")
	Double findRemoteDaysBymonth(@Param("month") long month);
	@Query(value = "SELECT u from RequestAuthorisation u WHERE u.userId.role.role in ('manager', 'Infra' , 'Rh' , 'treasurer' ) ")
	List<RequestAuthorisation> findRequestAuthorizationManager();

}