package com.csi.rh_project.setup.repository;

import com.csi.rh_project.setup.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
	List<Department> findByName(String name);
}
