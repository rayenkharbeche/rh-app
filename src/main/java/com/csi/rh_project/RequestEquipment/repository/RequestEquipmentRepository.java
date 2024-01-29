package com.csi.rh_project.RequestEquipment.repository;


import com.csi.rh_project.AdministrativeRequest.model.RequestAdministrative;
import com.csi.rh_project.RequestEquipment.model.RequestEquipment;
import com.csi.rh_project.auth.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface RequestEquipmentRepository extends JpaRepository<RequestEquipment, Long> {
	List<RequestEquipment> findRequestEquipmentByUserId(User userId);
	@Query(value = "SELECT u from RequestEquipment u WHERE  u.type = 'hardware' ")
	List<RequestEquipment> findRequestAdministrativestypeDirector();
	@Query(value = "SELECT u from RequestEquipment u WHERE  u.type <> 'hardware' ")
	List<RequestEquipment> findRequestAdministrativestypeNothardware();
}