package com.csi.rh_project.setup.controller;


import com.csi.rh_project.setup.model.Entity;
import com.csi.rh_project.setup.repository.EntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class EntityController {

	@Autowired
	EntityRepository entityRepository;

	@GetMapping("/Entities")
	public ResponseEntity<List<Entity>> getAllEntities(@RequestParam(required = false) String name) {
		try {
			List<Entity> Entities = new ArrayList<Entity>();

			if (name == null)
				entityRepository.findAll().forEach(Entities::add);
			else
				entityRepository.findByName(name).forEach(Entities::add);

			if (Entities.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(Entities, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/Entities/{id}")
	public ResponseEntity<Entity> getEntityById(@PathVariable("id") long id) {
		Optional<Entity> EntityData = entityRepository.findById(id);

		if (EntityData.isPresent()) {
			return new ResponseEntity<>(EntityData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/Entities")
	public ResponseEntity<Entity> createEntity(@RequestBody Entity entity) {
		try {
			Entity _Entity = entityRepository
					.save(new Entity(entity.getName(), entity.getCountryCode()));
			return new ResponseEntity<>(_Entity, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/Entities/{id}")
	public ResponseEntity<Entity> updateEntity(@PathVariable("id") long id, @RequestBody Entity Entity) {
		Optional<Entity> EntityData = entityRepository.findById(id);

		if (EntityData.isPresent()) {
			Entity _Entity = EntityData.get();
			_Entity.setName(Entity.getName());
			_Entity.setCountryCode(Entity.getCountryCode());
			return new ResponseEntity<>(entityRepository.save(_Entity), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/Entities/{id}")
	public ResponseEntity<HttpStatus> deleteEntity(@PathVariable("id") long id) {
		try {
			entityRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/Entities")
	public ResponseEntity<HttpStatus> deleteAllEntities() {
		try {
			entityRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}



}
