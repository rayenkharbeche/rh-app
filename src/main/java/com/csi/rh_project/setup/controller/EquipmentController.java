package com.csi.rh_project.setup.controller;


import com.csi.rh_project.setup.model.Entity;
import com.csi.rh_project.setup.model.Equipment;
import com.csi.rh_project.setup.repository.EquipmentRepository;
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
public class EquipmentController {

	@Autowired
	EquipmentRepository equipmentRepository;

	@GetMapping("/Equipments")
	public ResponseEntity<List<Equipment>> getAllEntities(@RequestParam(required = false) String name) {
		try {
			List<Equipment> Equipments = new ArrayList<Equipment>();

			if (name == null)
				equipmentRepository.findAll().forEach(Equipments::add);
			else
				equipmentRepository.findByName(name).forEach(Equipments::add);

			if (Equipments.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(Equipments, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/Equipments/{id}")
	public ResponseEntity<Equipment> getEntityById(@PathVariable("id") long id) {
		Optional<Equipment> EquipmentData = equipmentRepository.findById(id);

		if (EquipmentData.isPresent()) {
			return new ResponseEntity<>(EquipmentData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	@PostMapping("/Equipments")
	public ResponseEntity<Equipment> createEquipment(@RequestBody Equipment equipment) {
		try {
			Equipment _Equipment = equipmentRepository
					.save(new Equipment(equipment.getName(), equipment.getReference()));
			return new ResponseEntity<>(_Equipment, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/Equipments/{id}")
	public ResponseEntity<Equipment> updateEquipment(@PathVariable("id") long id, @RequestBody Equipment equipment) {
		Optional<Equipment> EquipmentData = equipmentRepository.findById(id);

		if (EquipmentData.isPresent()) {
			Equipment _Equipment = EquipmentData.get();
			_Equipment.setName(equipment.getName());
			_Equipment.setReference(equipment.getReference());
			return new ResponseEntity<>(equipmentRepository.save(_Equipment), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/Equipments/{id}")
	public ResponseEntity<HttpStatus> deleteEquipment(@PathVariable("id") long id) {
		try {
			equipmentRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/Equipments")
	public ResponseEntity<HttpStatus> deleteAllEntities() {
		try {
			equipmentRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}



}
