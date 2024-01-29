package com.csi.rh_project.RequestEquipment.controller;

import com.csi.rh_project.AdministrativeRequest.model.RequestAdministrative;
import com.csi.rh_project.RequestEquipment.model.RequestEquipment;
import com.csi.rh_project.RequestEquipment.repository.RequestEquipmentRepository;

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
public class RequestEquipmentController {
    @Autowired
    RequestEquipmentRepository requestRepository;
    private final UserService userService;
    private final EmailService emailService;

    public RequestEquipmentController(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;

    }

    @GetMapping("/RequestEquipment")
    public ResponseEntity<List<RequestEquipment>> getAllRequestsByEmployeeId(@RequestParam(required = false) Integer user_id) {
        try {
            System.out.println(user_id);

            List<RequestEquipment> requests = new ArrayList<RequestEquipment>();
            if (user_id != null) {
                Optional<User> user = userService.findById(user_id);
                System.out.println(user);

                requestRepository.findRequestEquipmentByUserId(user.get()).forEach(requests::add);
            }
            else {
                requestRepository.findAll().forEach(requests::add);

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

    @GetMapping("/RequestEquipment/{id}")
    public ResponseEntity<RequestEquipment> getEntityById(@PathVariable("id") long user_id) {
        Optional<RequestEquipment> EntityData = requestRepository.findById(user_id);
        System.out.println("test");
        if (EntityData.isPresent()) {
            System.out.println(EntityData+"another test         **********************************************");
            return new ResponseEntity<>(EntityData.get(), HttpStatus.OK);
        } else {
            System.out.println("another test 698745        **********************************************");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/RequestEquipment")
    public ResponseEntity<RequestEquipment> createEntity(@RequestBody RequestEquipment request) {
        try {
            System.out.println(request);
            RequestEquipment _Request = requestRepository

                    //.save(new RequestEquipment(request.getUserId(), request.getType(), request.getStatus()));
                    .save(new RequestEquipment(request.getUserId(), request.getType(), request.getEquipmentName(), request.getStatus()));

            System.out.println(_Request);
            String subject = "Request Equipment created";
            List<User> _users = null;
            if (Objects.equals(request.getUserId().getRole().getRole(), "teamLead")) {
                User user = userService.getmanager(request.getUserId().getTeam().getId());

                emailService.sendEmailFromTemplate(user, "email-template.txt" , subject,"Equipment Request");

            } else  if (Objects.equals(request.getUserId().getRole().getRole(), "consultant"))  {
                _users = userService.getteamLeadandManager(request.getUserId().getTeam().getId());
                if (!_users.isEmpty()) {
                    for (User _user : _users) {
                        emailService.sendEmailFromTemplate(_user, "email-template.txt" , subject,"Equipment Request");

                    }
                }

            }


            return new ResponseEntity<>(_Request, HttpStatus.CREATED);

        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/RequestEquipment/{id}")
    public ResponseEntity<HttpStatus> deleteEntity(@PathVariable("id") long user_id) {
        try {
            requestRepository.deleteById(user_id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/RequestEquipment")
    public ResponseEntity<HttpStatus> deleteAllEntities() {
        try {
            requestRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @PutMapping("/RequestEquipment/{id}")
    public ResponseEntity<RequestEquipment> updateEntity(@PathVariable("id") long id, @RequestBody RequestEquipment request) {
        Optional<RequestEquipment> EntityData = requestRepository.findById(id);

        if (EntityData.isPresent()) {
            RequestEquipment _RequestEquipment = EntityData.get();
            _RequestEquipment.setUserId(request.getUserId());
            _RequestEquipment.setType(request.getType());
            _RequestEquipment.setStatus(request.getStatus());

            _RequestEquipment.setEquipmentRef(request.getEquipmentRef());

            return new ResponseEntity<>(requestRepository.save(_RequestEquipment), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/RequestEquipment/updateStatus/{id}")
    public ResponseEntity<RequestEquipment> updateStatus(@PathVariable("id") long id, @RequestBody RequestEquipment request) {
        Optional<RequestEquipment> EntityData = requestRepository.findById(id);

        if (EntityData.isPresent()) {
            RequestEquipment _RequestEquipment = EntityData.get();
            _RequestEquipment.setStatus(request.getStatus());


            if (Objects.equals(request.getStatus(), "validated")){
                String subject = "Request Equipment validated";
                emailService.sendEmailFromTemplate(request.getUserId(), "email-template_1.txt" , subject,"Equipment Request");
            }


            return new ResponseEntity<>(requestRepository.save(_RequestEquipment), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/RequestEquipment/validation")
    public ResponseEntity<List<RequestEquipment>> getAllRequestvalidation(@RequestParam(required = false) Integer user_id) {
        try {

            List<RequestEquipment> requests = new ArrayList<RequestEquipment>();

            if (user_id != null){
                Optional<User> user = userService.findById(user_id);
                User _User = user.get();
                System.out.println(_User);

                if (Objects.equals(_User.getRole().getRole(), "Director")) {
                    requests.addAll(requestRepository.findRequestAdministrativestypeDirector());

                } else {
                    System.out.println("test");

                    requests.addAll(requestRepository.findRequestAdministrativestypeNothardware());
                }
            }
            else {
                System.out.println("test2");

                requestRepository.findAll().forEach(requests::add);

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







}