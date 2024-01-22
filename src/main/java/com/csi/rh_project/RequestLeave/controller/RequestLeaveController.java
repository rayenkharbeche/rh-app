package com.csi.rh_project.RequestLeave.controller;
import java.util.*;


import com.csi.rh_project.RequestLeave.model.RequestLeave;
import com.csi.rh_project.RequestLeave.repository.RequestLeaveRepository;

import com.csi.rh_project.auth.dtos.UpdateUserDto;
import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.auth.services.EmailService;
import com.csi.rh_project.auth.services.ImageService;
import com.csi.rh_project.auth.services.UserService;
import com.csi.rh_project.setup.model.Entity;

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
    private final EmailService emailService;

    public RequestLeaveController(UserService userService,EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;

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
            System.out.println(request);
            RequestLeave _Request = requestRepository

                    .save(new RequestLeave(request.getUserId(), request.getLeaveType(), request.getUpdateDate(),
                            request.getLeaveBalance(), request.getStatus(),request.getInterneStatus(), request.getStartDate(), request.getEndDate()));
            System.out.println(_Request);
            String subject = "Request Leave created";
            List<User> _users = null;
            if (Objects.equals(request.getUserId().getRole().getRole(), "teamLead")) {
                User user = userService.getmanager(request.getUserId().getTeam().getId());

                emailService.sendEmailFromTemplate(user, "email-template.txt" , subject);

            } else  if (Objects.equals(request.getUserId().getRole().getRole(), "consultant"))  {
                _users = userService.getteamLeadandManager(request.getUserId().getTeam().getId());
                if (!_users.isEmpty()) {
                    for (User _user : _users) {
                        emailService.sendEmailFromTemplate(_user, "email-template.txt" , subject);

                    }
                }

            }


            return new ResponseEntity<>(_Request, HttpStatus.CREATED);

        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/RequestLeave/{id}")
    public ResponseEntity<HttpStatus> deleteEntity(@PathVariable("id") long user_id) {
        try {
            requestRepository.deleteById(user_id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/RequestLeave")
    public ResponseEntity<HttpStatus> deleteAllEntities() {
        try {
            requestRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @PutMapping("/RequestLeave/{id}")
    public ResponseEntity<RequestLeave> updateEntity(@PathVariable("id") long id, @RequestBody RequestLeave requestLeave) {
        Optional<RequestLeave> EntityData = requestRepository.findById(id);

        if (EntityData.isPresent()) {
            RequestLeave _RequestLeave = EntityData.get();
            _RequestLeave.setStartDate(requestLeave.getStartDate());
            _RequestLeave.setEndDate(requestLeave.getEndDate());
            _RequestLeave.setLeaveType(requestLeave.getLeaveType());
            _RequestLeave.setInterneStatus(requestLeave.getInterneStatus());
            _RequestLeave.setStatus(requestLeave.getStatus());

            _RequestLeave.setFileDB(requestLeave.getFileDB());

            return new ResponseEntity<>(requestRepository.save(_RequestLeave), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/RequestLeave/RequestLeavebyteam")
    public ResponseEntity<List<RequestLeave>> getAllRequestsByTeam(@RequestParam(required = false) Integer user_id) {
        try {

            List<RequestLeave> requests = new ArrayList<RequestLeave>();
            List<User> users;

            Optional<User> userData = userService.findById(user_id);
            if (userData.isPresent()) {
                User _User = userData.get();
                users = userService.getUserByTeam(_User.getTeam().getId());

                for (User user : users) {
                    if(Objects.equals(_User.getRole().getRole(), "teamLead")) {
                        requestRepository.findRequestLeavesByConsultantsOnly(user.getId()).forEach(requests::add);

                    } else {
                        requestRepository.findRequestLeavesByTeamNotmanager(user.getId()).forEach(requests::add);
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
    @PutMapping("/RequestLeave/updateStatus/{id}")
    public ResponseEntity<RequestLeave> updateStatus(@PathVariable("id") long id, @RequestBody RequestLeave requestLeave) {
        Optional<RequestLeave> EntityData = requestRepository.findById(id);
        System.out.println(requestLeave);

        if (EntityData.isPresent()) {
            RequestLeave _RequestLeave = EntityData.get();
            _RequestLeave.setStatus(requestLeave.getStatus());
            //_RequestLeave.setUpdateDate(new Date());

            _RequestLeave.setInterneStatus(requestLeave.getInterneStatus());

            if (Objects.equals(requestLeave.getStatus(), "validated")){
                String subject = "Request Leave validated";
                emailService.sendEmailFromTemplate(requestLeave.getUserId(), "email-template_1.txt" , subject);
            }
            if (Objects.equals(requestLeave.getInterneStatus(), "tl_validated")){
                String subject = "Request Leave validated by Team Lead ";
                User manager = userService.getmanager(requestLeave.getUserId().getTeam().getId());
                emailService.sendEmailFromTemplate(manager, "email-template_2.txt" , subject);
            }


            return new ResponseEntity<>(requestRepository.save(_RequestLeave), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/RequestLeave/updateleaveCredit")
    public ResponseEntity<User> updateCreditUser(@RequestBody RequestLeave requestLeave) {

        long leaveDays = requestLeave.getEndDate().getTime() - requestLeave.getStartDate().getTime();
        float res = (leaveDays / (1000*60*60*24));

        return userService.addleaveCredit(requestLeave.getUserId().getId(), res);

    }



    @GetMapping("/RequestLeave/SickLeave/{id}")
    public ResponseEntity<List<RequestLeave>> getSickLeaveById(@PathVariable("id") long user_id) {
        try {
            System.out.println(user_id);

            List<RequestLeave> requests = new ArrayList<RequestLeave>();

            requests = requestRepository.findSickLeavesById(user_id);

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