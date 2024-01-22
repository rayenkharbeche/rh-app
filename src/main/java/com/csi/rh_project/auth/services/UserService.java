package com.csi.rh_project.auth.services;

import com.csi.rh_project.auth.dtos.UpdateUserDto;
import com.csi.rh_project.auth.models.Role;
import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.auth.repositories.RoleRepository;
import com.csi.rh_project.auth.repositories.UserRepository;
import com.csi.rh_project.setup.model.Team;
import com.csi.rh_project.setup.repository.TeamRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       TeamRepository teamRepository

    ) {
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.roleRepository = roleRepository;

    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }

    public Optional<User> findById(Integer id) {

        return userRepository.findById(id);
    }

    public ResponseEntity<User> updateUser(Integer id, UpdateUserDto user) {

        Optional<User> UserData = userRepository.findById(id);

        if (UserData.isPresent()) {
            System.out.println(user.getDepartment());


            User _User = UserData.get();

            _User.setEmail(user.getEmail());
            _User.setFirstName(user.getFirstname());
            _User.setLastName(user.getLastname());
            _User.setDepartment(user.getDepartment());
            _User.setEntity(user.getEntity());
            _User.setImage(user.getImage());
            _User.setBirthdayDate(user.getBirthdayDate());
            _User.setContractStartDate(user.getContractStartDate());
            _User.setLeaveCredit(user.getLeaveCredit());


            return new ResponseEntity<>(userRepository.save(_User), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public List<User> allUsersbydepartmentteam(Long departmentId, Long teamId) {
        List<User> users = new ArrayList<>();

        userRepository.findUserByDepartmentAndTeam(departmentId, teamId).forEach(users::add);

        return users;
    }

    public List<User> allUsersbydepartment(Long departmentId) {
        List<User> users = new ArrayList<>();

        userRepository.findUserByDepartment(departmentId).forEach(users::add);

        return users;
    }


    public ResponseEntity<User>  updateTeamlead(Integer id, Team team) {
        userRepository.updateUser(id, team);


        return new ResponseEntity<>(HttpStatus.OK);

    }
    public ResponseEntity<User>  updateTeamleadStatus(Integer id, Team team) {

        Optional<User> UserData = userRepository.findById(id);

        if (UserData.isPresent()) {

            User _User = UserData.get();
            Optional<Role> RoleData = roleRepository.findByRole("teamLead");

            _User.setRole(RoleData.get());



            return new ResponseEntity<>(userRepository.save(_User), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }


    }
    public ResponseEntity<User>  updateManagerStatus(Integer id, Team team) {

        Optional<User> UserData = userRepository.findById(id);

        if (UserData.isPresent()) {

            User _User = UserData.get();
            Optional<Role> RoleData = roleRepository.findByRole("manager");

            _User.setRole(RoleData.get());



            return new ResponseEntity<>(userRepository.save(_User), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }


    }

    public ResponseEntity<User> desafectTeam(Integer id) {

        Optional<User> UserData = userRepository.findById(id);

        if (UserData.isPresent()) {

            User _User = UserData.get();
            _User.setTeam(null);

        return new ResponseEntity<>(userRepository.save(_User), HttpStatus.OK);
    } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    }

    public List<User> getUserByTeam(long id) {

       return userRepository.findUserByTeam(id);


    }
    public List<User> getteamLeadandManager(long id) {

        return userRepository.findteamLeadandManager(id);


    }
    public User getmanager(long id) {

        return userRepository.findmanager(id);


    }
    public ResponseEntity<User> addleaveCredit(long id, double leaveCredit) {
        System.out.println(id);
        System.out.println(leaveCredit);

         userRepository.addLeaveCredit(id,leaveCredit);
        return new ResponseEntity<>(HttpStatus.OK);


    }
    public User save(User user) {
        return userRepository.save(user);

    }
}
