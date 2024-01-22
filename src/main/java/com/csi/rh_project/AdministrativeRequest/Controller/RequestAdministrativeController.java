package com.csi.rh_project.AdministrativeRequest.Controller;

import com.csi.rh_project.AdministrativeRequest.model.RequestAdministrative;
import com.csi.rh_project.AdministrativeRequest.repository.RequestAdministrativeRepository;
import com.csi.rh_project.RequestEAuthorisation.model.RequestAuthorisation;
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
public class RequestAdministrativeController {
    @Autowired
    RequestAdministrativeRepository requestAdministrativeRepository;
    private final UserService userService;

    public RequestAdministrativeController(UserService userService) {
        this.userService = userService;

    }

    @GetMapping("/RequestAdministrative")
    public ResponseEntity<List<RequestAdministrative>> getAllRequestsByEmployeeId(@RequestParam(required = false) Integer user_id) {
        try {
            System.out.println(user_id);

            List<RequestAdministrative> requests = new ArrayList<RequestAdministrative>();
            Optional<User> user = userService.findById(user_id);
            System.out.println(user);

            requestAdministrativeRepository.findRequestAdministrativeByUserId(user.get()).forEach(requests::add);

            if (requests.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(requests, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/RequestAdministrative/{id}")
    public ResponseEntity<RequestAdministrative> getEntityById(@PathVariable("id") long user_id) {
        Optional<RequestAdministrative> EntityData = requestAdministrativeRepository.findById(user_id);
        System.out.println("test");
        if (EntityData.isPresent()) {
            System.out.println(EntityData+"another test         **********************************************");
            return new ResponseEntity<>(EntityData.get(), HttpStatus.OK);
        } else {
            System.out.println("another test 698745        **********************************************");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/RequestAdministrative")
    public ResponseEntity<RequestAdministrative> createEntity(@RequestBody RequestAdministrative request) {
        try {
            System.out.println(request.getUserId());
            RequestAdministrative _Request = requestAdministrativeRepository

                    .save(new RequestAdministrative(request.getUserId(), request.getType()));
           // System.out.println(_Request);
            System.out.println(request.getType());
            return new ResponseEntity<>(_Request, HttpStatus.CREATED);

        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/RequestAdministrative/{id}")
    public ResponseEntity<HttpStatus> deleteEntity(@PathVariable("id") long user_id) {
        try {
            requestAdministrativeRepository.deleteById(user_id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/RequestAdministrative")
    public ResponseEntity<HttpStatus> deleteAllEntities() {
        try {
            requestAdministrativeRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}