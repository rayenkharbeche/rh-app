package com.csi.rh_project.auth.repositories;

import java.util.Optional;

import com.csi.rh_project.auth.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ImageRepository extends JpaRepository<Image, Long> {
	Optional<Image> findByName(String name);
}
