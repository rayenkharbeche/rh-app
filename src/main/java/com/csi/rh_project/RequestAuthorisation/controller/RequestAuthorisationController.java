package com.csi.rh_project.RequestAuthorisation.controller;

import com.csi.rh_project.RequestAuthorisation.model.RequestAuthorisation;
import com.csi.rh_project.RequestAuthorisation.repository.RequestAuthorisationRepository;
import com.csi.rh_project.RequestLeave.model.RequestLeave;
import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.auth.services.EmailService;
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
public class RequestAuthorisationController {
    @Autowired
    RequestAuthorisationRepository requestAuthorisationRepository;
    private final UserService userService;
    private final EmailService emailService;

    public RequestAuthorisationController(UserService userService,EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;

    }

    @GetMapping("/RequestAuthorisation")
    public ResponseEntity<List<RequestAuthorisation>> getAllRequestsByEmployeeId(@RequestParam(required = false) Integer user_id) {
        try {
            System.out.println(user_id);

            List<RequestAuthorisation> requests = new ArrayList<RequestAuthorisation>();
            Optional<User> user = userService.findById(user_id);
            System.out.println(user.get());

            requestAuthorisationRepository.findRequestAuthorisationByUserId(user.get()).forEach(requests::add);
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
            System.out.println(request);
            System.out.println(request.getType());

            System.out.println(request.getUserId());
            RequestAuthorisation _Request = requestAuthorisationRepository

                    .save(new RequestAuthorisation(request.getUserId(), request.getType(), request.getAuthorisationDate(),request.getStatus(),request.getInterneStatus()));
           // System.out.println(_Request);
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
    @GetMapping("/RequestAuthorisation/RequestAuthorizationbyteam")
    public ResponseEntity<List<RequestAuthorisation>> getAllRequestsByTeam(@RequestParam(required = false) Integer user_id) {
        try {

            List<RequestAuthorisation> requests = new ArrayList<RequestAuthorisation>();
            List<User> users;

            Optional<User> userData = userService.findById(user_id);
            if (userData.isPresent()) {
                User _User = userData.get();
                users = userService.getUserByTeam(_User.getTeam().getId());

                for (User user : users) {
                    if(Objects.equals(_User.getRole().getRole(), "teamLead")) {
                        requestAuthorisationRepository.findRequestLeavesByConsultantsOnly(user.getId()).forEach(requests::add);

                    } else {
                        requestAuthorisationRepository.findRequestLeavesByTeamNotmanager(user.getId()).forEach(requests::add);
                    }
                    System.out.println(requests);

                }
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
    @PutMapping("/RequestAuthorisation/updateStatus/{id}")
    public ResponseEntity<RequestAuthorisation> updateStatus(@PathVariable("id") long id, @RequestBody RequestAuthorisation requestLeave) {
        Optional<RequestAuthorisation> EntityData = requestAuthorisationRepository.findById(id);

        if (EntityData.isPresent()) {
            RequestAuthorisation _RequestAuthorisation = EntityData.get();
            _RequestAuthorisation.setStatus(requestLeave.getStatus());

            _RequestAuthorisation.setInterneStatus(requestLeave.getInterneStatus());

            if (Objects.equals(requestLeave.getStatus(), "validated")){
                String subject = "Request Authorisation validated";
                emailService.sendEmailFromTemplate(requestLeave.getUserId(), "email-template_1.txt" , subject,"Authorisation Request");
            }
            if (Objects.equals(requestLeave.getInterneStatus(), "tl_validated")){
                String subject = "Request Authorisation validated by Team Lead ";
                User manager = userService.getmanager(requestLeave.getUserId().getTeam().getId());
                emailService.sendEmailFromTemplate(manager, "email-template_3.txt" , subject,"Authorisation Request");
            }


            return new ResponseEntity<>(requestAuthorisationRepository.save(_RequestAuthorisation), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}