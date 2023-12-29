package com.csi.rh_project.setup.controller;


import com.csi.rh_project.setup.model.Entity;
import com.csi.rh_project.setup.model.Poste;
import com.csi.rh_project.setup.repository.EntityRepository;
import com.csi.rh_project.setup.repository.PosteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class PosteController {

	@Autowired
	PosteRepository posteRepository;

	@GetMapping("/Postes")
	public ResponseEntity<List<Poste>> getAllPostes(@RequestParam(required = false) String name) {
		try {
			List<Poste> Postes = new ArrayList<Poste>();

			if (name == null)
				posteRepository.findAll().forEach(Postes::add);
			else
				posteRepository.findByName(name).forEach(Postes::add);

			if (Postes.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(Postes, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/Postes/{id}")
	public ResponseEntity<Poste> getPosteById(@PathVariable("id") long id) {
		Optional<Poste> PosteData = posteRepository.findById(id);

		if (PosteData.isPresent()) {
			return new ResponseEntity<>(PosteData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	@PostMapping("/Postes")
	public ResponseEntity<Poste> createPoste(@RequestBody Poste poste) {
		try {
			Poste _Poste = posteRepository
					.save(new Poste(poste.getName()));
			return new ResponseEntity<>(_Poste, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/Postes/{id}")
	public ResponseEntity<Poste> updatePoste(@PathVariable("id") long id, @RequestBody Poste Poste) {
		Optional<Poste> PosteData = posteRepository.findById(id);

		if (PosteData.isPresent()) {
			Poste _Poste = PosteData.get();
			_Poste.setName(Poste.getName());
			return new ResponseEntity<>(posteRepository.save(_Poste), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/Postes/{id}")
	public ResponseEntity<HttpStatus> deletePoste(@PathVariable("id") long id) {
		try {
			posteRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/Postes")
	public ResponseEntity<HttpStatus> deleteAllPostes() {
		try {
			posteRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}



}
