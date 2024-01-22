package com.csi.rh_project.setup.service;

import com.csi.rh_project.auth.dtos.TeamDto;
import com.csi.rh_project.auth.repositories.UserRepository;
import com.csi.rh_project.setup.model.Team;
import com.csi.rh_project.setup.repository.TeamRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TeamService {
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;

    public TeamService(UserRepository userRepository,
                       TeamRepository teamRepository

    ) {
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;

    }

    public List<Team> allTeams() {
        List<Team> teams = new ArrayList<>();

        teamRepository.findAll().forEach(teams::add);

        return teams;
    }
    public Optional<Team> findById(long id) {

        return teamRepository.findById(id);
    }

    public ResponseEntity<Team>  save(long id,Team team) {

        Optional<Team> TeamData = teamRepository.findById(id);

        if (TeamData.isPresent()) {

            Team _Team = TeamData.get();

            return new ResponseEntity<>(teamRepository.save(_Team), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    public List<Team> findTeamByDepartment(Long departmentId){
        List<Team> teams = new ArrayList<>();

        teamRepository.findTeamByDepartment(departmentId).forEach(teams::add);

        return teams;
    }

}
