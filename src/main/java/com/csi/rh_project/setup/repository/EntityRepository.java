package com.csi.rh_project.setup.repository;

import com.csi.rh_project.setup.model.Entity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EntityRepository extends JpaRepository<Entity, Long> {
	List<Entity> findByName(String name);
}
