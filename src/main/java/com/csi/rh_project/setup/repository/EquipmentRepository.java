package com.csi.rh_project.setup.repository;

import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.setup.model.Equipment;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
	List<Equipment> findByName(String name);
	Optional<Equipment> findByReference(String name);

	//List<Equipment> findByUserIdAndName(Integer id,String name);
	Optional<Equipment>  findByUserIdAndName(Integer id,String name);

	List<Equipment> findAllByUserId(Integer id);
	@Transactional
	void deleteAllByUser(User user);
	List<Equipment> findAllByReference(String refernce);


}
