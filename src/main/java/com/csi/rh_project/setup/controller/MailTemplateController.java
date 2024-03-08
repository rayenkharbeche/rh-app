package com.csi.rh_project.setup.controller;


import com.csi.rh_project.setup.model.Entity;
import com.csi.rh_project.setup.model.MailTemplate;
import com.csi.rh_project.setup.repository.EntityRepository;
import com.csi.rh_project.setup.repository.MailTemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class MailTemplateController {

	@Autowired
	MailTemplateRepository mailTemplateRepository;

	@GetMapping("/MailTemplate")
	public ResponseEntity<List<MailTemplate>> getAllMailTemplate() {
		try {
			List<MailTemplate> Entities = new ArrayList<MailTemplate>();

				mailTemplateRepository.findAll().forEach(Entities::add);


			if (Entities.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(Entities, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/MailTemplate/{id}")
	public ResponseEntity<MailTemplate> getMailTemplateById(@PathVariable("id") long id) {
		Optional<MailTemplate> EntityData = mailTemplateRepository.findById(id);

		if (EntityData.isPresent()) {
			return new ResponseEntity<>(EntityData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	@PostMapping("/MailTemplate")
	public ResponseEntity<MailTemplate> createMailTemplate(@RequestBody MailTemplate mailTemplate) {
		try {
			MailTemplate _MailTemplate = mailTemplateRepository
					.save(new MailTemplate(mailTemplate.getReference(), mailTemplate.getSubject(),mailTemplate.getTemplate(),mailTemplate.getStatus()));
			return new ResponseEntity<>(_MailTemplate, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/MailTemplate/{id}")
	public ResponseEntity<MailTemplate> updateMailTemplate(@PathVariable("id") long id, @RequestBody MailTemplate Entity) {
		Optional<MailTemplate> EntityData = mailTemplateRepository.findById(id);

		if (EntityData.isPresent()) {
			MailTemplate _MailTemplate = EntityData.get();
			_MailTemplate.setSubject(Entity.getSubject());
			_MailTemplate.setTemplate(Entity.getTemplate());
			return new ResponseEntity<>(mailTemplateRepository.save(_MailTemplate), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/MailTemplate/{id}")
	public ResponseEntity<HttpStatus> deleteMailTemplate(@PathVariable("id") long id) {
		try {
			mailTemplateRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/MailTemplate")
	public ResponseEntity<HttpStatus> deleteAllMailTemplates() {
		try {
			mailTemplateRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}




}
