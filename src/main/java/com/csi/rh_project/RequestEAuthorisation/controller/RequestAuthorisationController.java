package com.csi.rh_project.RequestEAuthorisation.controller;

import com.csi.rh_project.RequestEAuthorisation.model.RequestAuthorisation;
import com.csi.rh_project.RequestEAuthorisation.repository.RequestAuthorisationRepository;
import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.auth.services.UserService;
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
public class RequestAuthorisationController {
    @Autowired
    RequestAuthorisationRepository requestAuthorisationRepository;
    private final UserService userService;

    public RequestAuthorisationController(UserService userService) {
        this.userService = userService;

    }

    @GetMapping("/RequestAuthorisation")
    public ResponseEntity<List<RequestAuthorisation>> getAllRequestsByEmployeeId(@RequestParam(required = false) Integer user_id) {
        try {
            System.out.println(user_id);

            List<RequestAuthorisation> requests = new ArrayList<RequestAuthorisation>();
            Optional<User> user = userService.findById(user_id);
            System.out.println(user);

            requestAuthorisationRepository.findRequestAuthorisationByUserId(user.get()).forEach(requests::add);

            if (requests.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(requests, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/RequestAuthorisation/{id}")
    public ResponseEntity<RequestAuthorisation> getEntityById(@PathVariable("id") long user_id) {
        Optional<RequestAuthorisation> EntityData = requestAuthorisationRepository.findById(user_id);
        System.out.println("test");
        if (EntityData.isPresent()) {
            System.out.println(EntityData+"another test         **********************************************");
            return new ResponseEntity<>(EntityData.get(), HttpStatus.OK);
        } else {
            System.out.println("another test 698745        **********************************************");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/RequestAuthorisation")
    public ResponseEntity<RequestAuthorisation> createEntity(@RequestBody RequestAuthorisation request) {
        try {
            System.out.println(request.getUserId());
            RequestAuthorisation _Request = requestAuthorisationRepository

                    .save(new RequestAuthorisation(request.getUserId(), request.getType(), request.getAuthorisationDate(),request.getStatutDemande()));
           // System.out.println(_Request);
            System.out.println(request.getType());
            return new ResponseEntity<>(_Request, HttpStatus.CREATED);

        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/RequestAuthorisation/{id}")
    public ResponseEntity<HttpStatus> deleteEntity(@PathVariable("id") long user_id) {
        try {
        	requestAuthorisationRepository.deleteById(user_id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/RequestAuthorisation")
    public ResponseEntity<HttpStatus> deleteAllEntities() {
        try {
        	requestAuthorisationRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}