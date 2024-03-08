package com.csi.rh_project.setup.controller;


import com.csi.rh_project.setup.model.Entity;
import com.csi.rh_project.setup.model.Holiday;
import com.csi.rh_project.setup.repository.EntityRepository;
import com.csi.rh_project.setup.repository.HolidayRepository;
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
public class HolidayController {

	@Autowired
	HolidayRepository holidayRepository;

	@GetMapping("/Holidays")
	public ResponseEntity<List<Holiday>> getAllEntities() {
		try {
			List<Holiday> Entities = new ArrayList<Holiday>();

				holidayRepository.findAll().forEach(Entities::add);


			if (Entities.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(Entities, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/Holidays/{id}")
	public ResponseEntity<Holiday> getEntityById(@PathVariable("id") long id) {
		Optional<Holiday> EntityData = holidayRepository.findById(id);

		if (EntityData.isPresent()) {
			return new ResponseEntity<>(EntityData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	@PostMapping("/Holidays")
	public ResponseEntity<Holiday> createEntity(@RequestBody Holiday entity) {
		try {
			Holiday _Entity = holidayRepository
					.save(new Holiday(entity.getDate(), entity.getCountryCode(),entity.getActive()));
			return new ResponseEntity<>(_Entity, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/Holidays/{id}")
	public ResponseEntity<Holiday> updateEntity(@PathVariable("id") long id, @RequestBody Holiday Entity) {
		Optional<Holiday> EntityData = holidayRepository.findById(id);

		if (EntityData.isPresent()) {
			Holiday _Entity = EntityData.get();
			_Entity.setDate(Entity.getDate());
			_Entity.setCountryCode(Entity.getCountryCode());
			_Entity.setActive(Entity.getActive());

			return new ResponseEntity<>(holidayRepository.save(_Entity), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/Holidays/{id}")
	public ResponseEntity<HttpStatus> deleteEntity(@PathVariable("id") long id) {
		try {
			holidayRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/Holidays")
	public ResponseEntity<HttpStatus> deleteAllEntities() {
		try {
			holidayRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}




}
