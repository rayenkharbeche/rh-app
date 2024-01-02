package com.csi.rh_project.RequestLeave.controller;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.csi.rh_project.RequestLeave.model.RequestLeave;
import com.csi.rh_project.RequestLeave.repository.RequestLeaveRepository;

import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.auth.services.ImageService;
import com.csi.rh_project.auth.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class RequestLeaveController {
    @Autowired
    RequestLeaveRepository requestRepository;
    private final UserService userService;

    public RequestLeaveController(UserService userService) {
        this.userService = userService;

    }

    @GetMapping("/RequestLeave")
    public ResponseEntity<List<RequestLeave>> getAllRequestsByEmployeeId(@RequestParam(required = false) Integer user_id) {
        try {
            System.out.println(user_id);

            List<RequestLeave> requests = new ArrayList<RequestLeave>();
            Optional<User> user = userService.findById(user_id);
            System.out.println(user);

            requestRepository.findRequestLeavesByUserId(user.get()).forEach(requests::add);

            if (requests.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(requests, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/RequestLeave/{id}")
    public ResponseEntity<RequestLeave> getEntityById(@PathVariable("id") long user_id) {
        Optional<RequestLeave> EntityData = requestRepository.findById(user_id);
        System.out.println("test");
        if (EntityData.isPresent()) {
            System.out.println(EntityData+"another test         **********************************************");
            return new ResponseEntity<>(EntityData.get(), HttpStatus.OK);
        } else {
            System.out.println("another test 698745        **********************************************");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/RequestLeave")
    public ResponseEntity<RequestLeave> createEntity(@RequestBody RequestLeave request) {
        try {
            System.out.println(request.getUserId());
            RequestLeave _Request = requestRepository

                    .save(new RequestLeave(request.getUserId(), request.getLeaveType(), request.getUpdateDate(),
                            request.getLeaveBalance(), request.getStatutDemande()));
            System.out.println(_Request);
            return new ResponseEntity<>(_Request, HttpStatus.CREATED);

        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/RequestEquipement/{id}")
    public ResponseEntity<HttpStatus> deleteEntity(@PathVariable("id") long user_id) {
        try {
            requestRepository.deleteById(user_id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/RequestEquipement")
    public ResponseEntity<HttpStatus> deleteAllEntities() {
        try {
            requestRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}