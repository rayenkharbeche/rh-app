package com.csi.rh_project.auth.controllers;


import com.csi.rh_project.auth.models.Role;
import com.csi.rh_project.auth.repositories.RoleRepository;
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
public class RoleController {

	@Autowired
	RoleRepository roleRepository;

	@GetMapping("/Roles")
	public ResponseEntity<List<Role>> getAllRoles() {
		try {
			List<Role> Entities = new ArrayList<Role>();
				roleRepository.findAll().forEach(Entities::add);

			if (Entities.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(Entities, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/Roles/{id}")
	public ResponseEntity<Role> getEntityById(@PathVariable("id") long id) {
		Optional<Role> EntityData = roleRepository.findById(id);

		if (EntityData.isPresent()) {
			return new ResponseEntity<>(EntityData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	@PostMapping("/Roles")
	public ResponseEntity<Role> createEntity(@RequestBody Role role) {
		try {
			Role _Role = roleRepository
					.save(new Role(role.getRole()));
			return new ResponseEntity<>(_Role, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/Roles/{id}")
	public ResponseEntity<Role> updateEntity(@PathVariable("id") long id, @RequestBody Role role) {
		Optional<Role> RoleData = roleRepository.findById(id);

		if (RoleData.isPresent()) {
			Role _Role = RoleData.get();
			_Role.setRole(role.getRole());
			return new ResponseEntity<>(roleRepository.save(_Role), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/Roles/{id}")
	public ResponseEntity<HttpStatus> deleteEntity(@PathVariable("id") long id) {
		try {
			roleRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/Roles")
	public ResponseEntity<HttpStatus> deleteAllEntities() {
		try {
			roleRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}




}
