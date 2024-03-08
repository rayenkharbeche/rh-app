package com.csi.rh_project.setup.controller;


import com.csi.rh_project.setup.model.Entity;
import com.csi.rh_project.setup.model.GeneralControl;
import com.csi.rh_project.setup.repository.EntityRepository;
import com.csi.rh_project.setup.repository.GeneralRepository;
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
public class GeneralController {

	@Autowired
	GeneralRepository generalRepository;



	@GetMapping("/GeneralControl/{id}")
	public ResponseEntity<GeneralControl> getEntityById(@PathVariable("id") long id) {
		Optional<GeneralControl> EntityData = generalRepository.findById(id);

		if (EntityData.isPresent()) {
			return new ResponseEntity<>(EntityData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	@PostMapping("/GeneralControl")
	public ResponseEntity<GeneralControl> createEntity(@RequestBody GeneralControl entity) {
		try {
			GeneralControl _GeneralControl = generalRepository
					.save(new GeneralControl(entity.getAuthorizationMaxNbr(), entity.getRemoteDayMax()));
			return new ResponseEntity<>(_GeneralControl, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/GeneralControl/{id}")
	public ResponseEntity<GeneralControl> updateEntity(@PathVariable("id") long id, @RequestBody GeneralControl Entity) {
		Optional<GeneralControl> EntityData = generalRepository.findById(id);

		if (EntityData.isPresent()) {
			GeneralControl _Entity = EntityData.get();
			_Entity.setAuthorizationMaxNbr(Entity.getAuthorizationMaxNbr());
			_Entity.setRemoteDayMax(Entity.getRemoteDayMax());
			return new ResponseEntity<>(generalRepository.save(_Entity), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/GeneralControl/{id}")
	public ResponseEntity<HttpStatus> deleteEntity(@PathVariable("id") long id) {
		try {
			generalRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/GeneralControl")
	public ResponseEntity<HttpStatus> deleteAllEntities() {
		try {
			generalRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}




}
