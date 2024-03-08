package com.csi.rh_project.auth.controllers;


import com.csi.rh_project.auth.dtos.RegisterUserDto;
import com.csi.rh_project.auth.dtos.UpdateUserDto;
import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.auth.services.ImageService;
import com.csi.rh_project.auth.services.UserService;

import com.csi.rh_project.setup.model.Team;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RequestMapping("/users")
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    private final UserService userService;
    private final ImageService imageService;


    public UserController(UserService userService, ImageService imageService) {
        this.imageService = imageService;

        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(currentUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable("id") int id) {
        Optional<User> UserData = userService.findById(id);

        return UserData.map(user -> new ResponseEntity<>(user, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public ResponseEntity<List<User>> allUsers() {
        List <User> users = userService.allUsers();

        return ResponseEntity.ok(users);
    }
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Integer id, @RequestBody UpdateUserDto user) {
        System.out.println(user.getImage());

        if (user.getImage() != null) {
            user.setImage(imageService.findById(user.getImage().getId()));
        }

        return userService.updateUser(id, user);

    }
    @PostMapping("/addUser")
    public ResponseEntity<User> addUser(@RequestBody User user) {


        User registeredUser = userService.addUser(user);

        return ResponseEntity.ok(registeredUser);
    }
    @GetMapping("/team")
    public ResponseEntity<List<User>> allUsersbydepartmentteam(@RequestParam Long departmentId,@RequestParam Long teamId) {
        System.out.println(departmentId);
        System.out.println(teamId);

        List <User> users = userService.allUsersbydepartmentteam(departmentId, teamId);

        return ResponseEntity.ok(users);
    }

    @PutMapping("/teamlead/{id}")
    public  ResponseEntity<Team>  updateUserTeam(@PathVariable("id") Integer id, @RequestBody Team team) {
        System.out.println(team);
        if (team.getId() == 0){
        userService.desafectTeam(id);
        }
        else {
            userService.updateTeamlead(id,team);

        }

        return new ResponseEntity<>(team, HttpStatus.OK);

    }

    @PutMapping("/resetInfo/{id}")
    public ResponseEntity<User> resetInfo(@PathVariable("id") Integer id, @RequestBody UpdateUserDto user) {



        return userService.resetInfo(id, user);

    }

    @GetMapping("/department")
    public ResponseEntity<List<User>> allUsersbydepartment(@RequestParam Long departmentId) {
        System.out.println(departmentId);
        List <User> users = userService.allUsersbydepartment(departmentId);

        return ResponseEntity.ok(users);
    }
    @PutMapping("/teamleadstatus/{id}")
    public  ResponseEntity<Team>  updateteamleadStatus(@PathVariable("id") Integer id, @RequestBody Team team) {
        System.out.println(team);
        if (team.getId() != 0){
            userService.updateTeamleadStatus(id,team);

        }

        return new ResponseEntity<>(team, HttpStatus.OK);

    }
    @PutMapping("/managerstatus/{id}")
    public  ResponseEntity<Team>  updatemanagerStatus(@PathVariable("id") Integer id, @RequestBody Team team) {
        System.out.println(team);
        if (team.getId() != 0){
            userService.updateManagerStatus(id,team);

        }

        return new ResponseEntity<>(team, HttpStatus.OK);

    }
    @GetMapping("/usersnumber")
    public ResponseEntity<Double> usersNumber() {
        System.out.println("1");

        Double usersnumber = userService.EmployeeNumber();
        System.out.println("3");

        return ResponseEntity.ok(usersnumber);
    }
    @GetMapping("/availableEmployee")
    public ResponseEntity<Integer> AvailableEmployee() {
        System.out.println("1");

        int usersnumber = userService.AvailableEmployee();
        System.out.println(usersnumber);

        return ResponseEntity.ok(usersnumber);
    }






}
