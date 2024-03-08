package com.csi.rh_project.setup.repository;

import com.csi.rh_project.setup.model.Entity;
import com.csi.rh_project.setup.model.MailTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MailTemplateRepository extends JpaRepository<MailTemplate, Long> {
	MailTemplate findByReference(String reference);

}
