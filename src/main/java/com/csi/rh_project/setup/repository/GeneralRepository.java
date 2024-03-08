package com.csi.rh_project.setup.repository;

import com.csi.rh_project.setup.model.Entity;
import com.csi.rh_project.setup.model.GeneralControl;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GeneralRepository extends JpaRepository<GeneralControl, Long> {

}
