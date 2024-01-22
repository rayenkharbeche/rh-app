package com.csi.rh_project.RequestAuthorization.controller;

/*
import com.csi.rh_project.RequestAuthorization.model.RequestAuthorization;
import com.csi.rh_project.RequestAuthorization.repository.RequestAuthorizationRepository;
import com.csi.rh_project.setup.model.Entity;
import com.csi.rh_project.setup.repository.EntityRepository;
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
public class RequestAuthorizationController {

	@Autowired
	RequestAuthorizationRepository requestAuthorizationRepository;

	@GetMapping("/Entities")
	public ResponseEntity<List<RequestAuthorization>> getAllEntities(@RequestParam(required = false) String name) {
		try {
			List<RequestAuthorization> Entities = new ArrayList<RequestAuthorization>();

			if (name == null)
				requestAuthorizationRepository.findAll().forEach(Entities::add);
			else
				requestAuthorizationRepository.findByName(name).forEach(Entities::add);

			if (Entities.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(Entities, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/Entities/{id}")
	public ResponseEntity<RequestAuthorization> getEntityById(@PathVariable("id") long id) {
		Optional<RequestAuthorization> EntityData = requestAuthorizationRepository.findById(id);

		if (EntityData.isPresent()) {
			return new ResponseEntity<>(EntityData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	@PostMapping("/Entities")
	public ResponseEntity<RequestAuthorization> createEntity(@RequestBody RequestAuthorization rqauthorization) {
		try {
			this.employee = employee;
			this.type = type;
			this.closingDate = closingDate;
			this.traitementDate = traitementDate;
			this.createDate = createDate;
			this.statutDemande = statutDemande;
			Entity _Entity = requestAuthorizationRepository
					.save(new RequestAuthorization(rqauthorization.getTraitementDate(),rqauthorization.getAuthorisation_Date(),rqauthorization.getStatutDemande(), rqauthorization.getType()));
			return new ResponseEntity<>(_Entity, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/Entities/{id}")
	public ResponseEntity<RequestAuthorization> updateEntity(@PathVariable("id") long id, @RequestBody RequestAuthorization rqAuthorization) {
		Optional<RequestAuthorization> EntityData = requestAuthorizationRepository.findById(id);

		if (EntityData.isPresent()) {
			Entity _Entity = EntityData.get();
			_Entity.setName(rqAuthorization.getType());
			_Entity.s(rqAuthorization.getAuthorisation_Date());
			return new ResponseEntity<>(requestAuthorizationRepository.save(_Entity), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/RequestAuthorization/{id}")
	public ResponseEntity<HttpStatus> deleteEntity(@PathVariable("id") long id) {
		try {
			requestAuthorizationRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/RequestAuthorization")
	public ResponseEntity<HttpStatus> deleteAllEntities() {
		try {
			requestAuthorizationRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}




}*/
