package com.csi.rh_project.setup.controller;


import com.csi.rh_project.setup.model.Department;
import com.csi.rh_project.setup.model.Entity;
import com.csi.rh_project.setup.repository.DepartmentRepository;
import com.csi.rh_project.setup.repository.EntityRepository;
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
public class DepartmentController {

	@Autowired
	DepartmentRepository departmentRepository;

	@GetMapping("/Departments")
	public ResponseEntity<List<Department>> getAllDepartments(@RequestParam(required = false) String name) {
		try {
			List<Department> Departments = new ArrayList<Department>();

			if (name == null)
				departmentRepository.findAll().forEach(Departments::add);
			else
				departmentRepository.findByName(name).forEach(Departments::add);

			if (Departments.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(Departments, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/Departments/{id}")
	public ResponseEntity<Department> getDepartmentById(@PathVariable("id") long id) {
		Optional<Department> DepartmentData = departmentRepository.findById(id);

		if (DepartmentData.isPresent()) {
			return new ResponseEntity<>(DepartmentData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	@PostMapping("/Departments")
	public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
		try {
			Department _Department = departmentRepository
					.save(new Department(department.getName()));
			return new ResponseEntity<>(_Department, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/Departments/{id}")
	public ResponseEntity<Department> updateDepartment(@PathVariable("id") long id, @RequestBody Department Department) {
		Optional<Department> DepartmentData = departmentRepository.findById(id);

		if (DepartmentData.isPresent()) {
			Department _Department = DepartmentData.get();
			_Department.setName(Department.getName());
			return new ResponseEntity<>(departmentRepository.save(_Department), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/Departments/{id}")
	public ResponseEntity<HttpStatus> deleteDepartment(@PathVariable("id") long id) {
		try {
			departmentRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/Departments")
	public ResponseEntity<HttpStatus> deleteAllDepartments() {
		try {
			departmentRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}



}
