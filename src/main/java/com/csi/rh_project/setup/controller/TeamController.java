package com.csi.rh_project.setup.controller;

import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.auth.services.ImageService;
import com.csi.rh_project.auth.services.UserService;
import com.csi.rh_project.setup.model.Department;
import com.csi.rh_project.setup.model.Team;

import com.csi.rh_project.setup.repository.TeamRepository;
import com.csi.rh_project.setup.service.TeamService;
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
public class TeamController {

	@Autowired
	TeamRepository teamRepository;
	private final TeamService teamService;

	public TeamController(TeamService teamService) {
		this.teamService = teamService;
	}

	@GetMapping("/Teams")
	public ResponseEntity<List<Team>> getAllEntities(@RequestParam(required = false) String name) {
		try {
			List<Team> Teams = new ArrayList<Team>();

			if (name == null)
				teamRepository.findAll().forEach(Teams::add);
			else
				teamRepository.findByName(name).forEach(Teams::add);

			if (Teams.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(Teams, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/Teams/{id}")
	public ResponseEntity<Team> getEntityById(@PathVariable("id") long id) {
		Optional<Team> TeamData = teamRepository.findById(id);

		if (TeamData.isPresent()) {
			return new ResponseEntity<>(TeamData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping
	public ResponseEntity<List<Team>> allUsers() {
		List <Team> teams = teamService.allTeams();

		return ResponseEntity.ok(teams);
	}

	@GetMapping("/Teams/department/{id}")
	public ResponseEntity<List<Team>> getTeamByDepartment(@PathVariable("id") long id) {
			List <Team> teams = teamService.findTeamByDepartment(id);


			return ResponseEntity.ok(teams);

		}
	@PostMapping("/Teams")
	public ResponseEntity<Team> createEntity(@RequestBody Team team) {
		try {
			Team _Team = teamRepository
					.save(new Team(team.getName(), team.getDepartment() ));
			return new ResponseEntity<>(_Team, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/Teams/{id}")
	public ResponseEntity<Team> updateEntity(@PathVariable("id") long id, @RequestBody Team team) {
		Optional<Team> TeamData = teamRepository.findById(id);

		if (TeamData.isPresent()) {
			Team _Team = TeamData.get();
			_Team.setName(team.getName());
			_Team.setDepartment(team.getDepartment());
			/*_Team.setConsultant(team.getConsultant());*/

			return new ResponseEntity<>(teamRepository.save(_Team), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/Teams/{id}")
	public ResponseEntity<HttpStatus> deleteEntity(@PathVariable("id") long id) {
		try {
			teamRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/Teams")
	public ResponseEntity<HttpStatus> deleteAllEntities() {
		try {
			teamRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}




}
