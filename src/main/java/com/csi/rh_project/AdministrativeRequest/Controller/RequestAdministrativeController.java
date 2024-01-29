package com.csi.rh_project.AdministrativeRequest.Controller;

import com.csi.rh_project.AdministrativeRequest.model.RequestAdministrative;
import com.csi.rh_project.AdministrativeRequest.repository.RequestAdministrativeRepository;
import com.csi.rh_project.RequestLeave.model.RequestLeave;
import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.auth.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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

            List<RequestAdministrative> requests = new ArrayList<RequestAdministrative>();
            /*if (user_id != null){
            Optional<User> user = userService.findById(user_id);
                requestAdministrativeRepository.findRequestAdministrativeByUserId(user.get()).forEach(requests::add);

            }*/
            if (user_id != null){
                Optional<User> user = userService.findById(user_id);
                User _User = user.get();
                requestAdministrativeRepository.findRequestAdministrativeByUserId(user.get()).forEach(requests::add);

            }
             else {

                requestAdministrativeRepository.findAll().forEach(requests::add);

            }

            System.out.println(requests);

            if (requests.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(requests, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/RequestAdministrative/validation")
    public ResponseEntity<List<RequestAdministrative>> getAllRequestvalidation(@RequestParam(required = false) Integer user_id) {
        try {

            List<RequestAdministrative> requests = new ArrayList<RequestAdministrative>();

            if (user_id != null){
                Optional<User> user = userService.findById(user_id);
                User _User = user.get();
                if (Objects.equals(_User.getRole().getRole(), "Infra")) {
                    requestAdministrativeRepository.findRequestAdministrativestypeITsupport().forEach(requests::add);

                } else  if (Objects.equals(_User.getRole().getRole(), "Rh")) {
                    requestAdministrativeRepository.findRequestAdministrativestypeITsupport().forEach(requests::add);
                }
            }
            else {
                System.out.println("test2");

                requestAdministrativeRepository.findAll().forEach(requests::add);

            }

            System.out.println(requests);

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

                    .save(new RequestAdministrative(request.getUserId(), request.getType(), request.getStatus(), request.getInterneStatus()));
           // System.out.println(_Request);
            System.out.println(request.getType());
            return new ResponseEntity<>(_Request, HttpStatus.CREATED);

        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/RequestAdministrative/{id}")
    public ResponseEntity<RequestAdministrative> updateEntity(@PathVariable("id") long id, @RequestBody RequestAdministrative requestAdministrative) {
        Optional<RequestAdministrative> EntityData = requestAdministrativeRepository.findById(id);

        if (EntityData.isPresent()) {
            RequestAdministrative _RequestAdministrative = EntityData.get();
            _RequestAdministrative.setType(requestAdministrative.getType());
            _RequestAdministrative.setInterneStatus(requestAdministrative.getInterneStatus());
            _RequestAdministrative.setStatus(requestAdministrative.getStatus());


            return new ResponseEntity<>(requestAdministrativeRepository.save(_RequestAdministrative), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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