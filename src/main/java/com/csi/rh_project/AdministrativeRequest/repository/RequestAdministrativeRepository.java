package com.csi.rh_project.AdministrativeRequest.repository;

import com.csi.rh_project.AdministrativeRequest.model.RequestAdministrative;
import com.csi.rh_project.RequestLeave.model.RequestLeave;
import com.csi.rh_project.auth.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RequestAdministrativeRepository extends JpaRepository<RequestAdministrative, Long> {
	List<RequestAdministrative> findRequestAdministrativeByUserId(User user);

	@Query(value = "SELECT u from RequestAdministrative u WHERE  u.type = 'ITsupport' ")
	List<RequestAdministrative> findRequestAdministrativestypeITsupport();
	@Query(value = "SELECT u from RequestAdministrative u WHERE  u.type in ('workCertificate','salaryCertificate','payslip','insurancePrint','DirectDebitWages') ")
	List<RequestAdministrative> findRequestAdministrativesRH();


	@Query(value = "SELECT u from RequestAdministrative u WHERE  u.type in ('salaryAdvance','loan') ")
	List<RequestAdministrative> findRequestAdministrativesDG();
	@Query(value = "SELECT u from RequestAdministrative u WHERE  u.type in ('missionExpenses','OncallReimbursement','reimbursementExpenses') ")
	List<RequestAdministrative> findRequestAdministrativesFN();

}