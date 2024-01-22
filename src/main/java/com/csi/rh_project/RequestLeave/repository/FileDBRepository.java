package com.csi.rh_project.RequestLeave.repository;

import com.csi.rh_project.RequestLeave.model.FileDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FileDBRepository extends JpaRepository<FileDB, String> {

}
