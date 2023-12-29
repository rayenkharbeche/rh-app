package com.csi.rh_project.setup.repository;

import com.csi.rh_project.setup.model.Entity;
import com.csi.rh_project.setup.model.Poste;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PosteRepository extends JpaRepository<Poste, Long> {
	List<Poste> findByName(String name);
}
