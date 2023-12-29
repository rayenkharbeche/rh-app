package com.csi.rh_project.setup.repository;

import com.csi.rh_project.setup.model.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
	List<Equipment> findByName(String name);
}
