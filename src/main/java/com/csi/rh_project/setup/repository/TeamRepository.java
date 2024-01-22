package com.csi.rh_project.setup.repository;

import com.csi.rh_project.auth.dtos.TeamDto;
import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.setup.model.Department;
import com.csi.rh_project.setup.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Long> {
	List<Team> findByName(String name);
	List<Team> findByDepartment(Department department);
	@Query(value = "SELECT u from Team u WHERE u.department.id = :departmentId")
	List<Team> findTeamByDepartment(@Param("departmentId") long departmentId);

}
