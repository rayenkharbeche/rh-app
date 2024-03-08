package com.csi.rh_project.RequestAuthorisation.controller;

import com.csi.rh_project.RequestAuthorisation.model.RequestAuthorisation;
import com.csi.rh_project.RequestAuthorisation.repository.RequestAuthorisationRepository;
import com.csi.rh_project.RequestLeave.model.RequestLeave;
import com.csi.rh_project.auth.dtos.UpdateUserDto;
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


            System.out.println(request.getUserId());
            RequestAuthorisation _Request = requestAuthorisationRepository

                    .save(new RequestAuthorisation(request.getUserId(), request.getType(), request.getAuthorisationStartDate(),request.getAuthorisationEndDate(),request.getStatus(),request.getInterneStatus(),request.getRemoteDays()));




            //String subject = "Request Authorization created";
            /*if (Objects.equals(request.getUserId().getRole().getRole(), "teamLead")) {
                User user = userService.getmanager(request.getUserId().getTeam().getId());

                emailService.sendEmailFromTemplateWithUserInfo(user, request.getUserId(), "email-template.txt" , subject,"Leave Request");

            } else  if (Objects.equals(request.getUserId().getRole().getRole(), "consultant"))  {
                User _user = userService.getteamLead(request.getUserId().getTeam().getId());
                emailService.sendEmailFromTemplateWithUserInfo(_user, request.getUserId(), "email-template.txt" , subject,"Leave Request");


            }*/
            String subject = "Demande d'authorisation Crée";
            String mail_template= "template-mail-create-request-authorisation.txt";

            if (!Objects.equals(request.getUserId().getSuperior(), null)){
                emailService.sendEmailRequestAuthwithData(request.getUserId().getSuperior(),request, subject, mail_template);

                //emailService.sendEmailFromTemplateWithUserInfo(request.getUserId().getSuperior(), request.getUserId(), "email-template.txt" , subject,"Leave Request");

            }



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
            List<User> usersTl;
            List<RequestAuthorisation> requestsTL = new ArrayList<RequestAuthorisation>();

            Optional<User> userData = userService.findById(user_id);
            if (userData.isPresent()) {
                User _User = userData.get();

                if (Objects.equals(_User.getRole().getRole(), "director")){
                    requests = requestAuthorisationRepository.findRequestAuthorizationManager();

                } else {
                    //users = userService.getUserByTeam(_User.getTeam().getId());
                    users = userService.findconsultantbySuperior(_User.getId());

                    for (User user : users) {
                        if (Objects.equals(_User.getRole().getRole(), "teamLead")) {
                            requestAuthorisationRepository.findRequestLeavesByConsultantsOnly(user.getId()).forEach(requests::add);

                        } else {
                            requests = requestAuthorisationRepository.findRequestLeavesByTeamNotmanager(user.getId());
                            usersTl = userService.findconsultantbySuperior(user.getId());

                            for (User _user : usersTl) {
                                requestsTL = requestAuthorisationRepository.findRequestLeavesByTeamNotmanager(user.getId());

                            }

                            requests.addAll(requestsTL);
                            //requestAuthorisationRepository.findRequestLeavesByTeamNotmanager(user.getId()).forEach(requests::add);
                        }
                        System.out.println(requests);

                    }
                }
            }

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
    public ResponseEntity<RequestAuthorisation> updateStatus(@PathVariable("id") long id, @RequestBody RequestAuthorisation request) {
        Optional<RequestAuthorisation> EntityData = requestAuthorisationRepository.findById(id);

        if (EntityData.isPresent()) {
            RequestAuthorisation _RequestAuthorisation = EntityData.get();
            _RequestAuthorisation.setStatus(request.getStatus());

            _RequestAuthorisation.setInterneStatus(request.getInterneStatus());

            if (Objects.equals(request.getStatus(), "validated")){
                System.out.println("test1");

                //String subject = "Request Authorisation validated";
                String subject = "Demande d'authorisation validée";
                String mail_template= "template-mail-create-request-authorisation.txt";
                //emailService.sendEmailFromTemplate(request.getUserId(), "email-template_1.txt" , subject,"Authorisation Request");
                emailService.sendEmailRequestAuthwithData(request.getUserId(),request, subject, mail_template);

                if (Objects.equals(request.getType(), "homeoffice")){
                    System.out.println("test2");

                    User user = request.getUserId();
                    long remoteDay = request.getAuthorisationEndDate().getTime() - request.getAuthorisationStartDate().getTime();
                    float remoteDay_res = (remoteDay / (1000 * 60 * 60 * 24));
                    System.out.println(remoteDay_res);

                    user.setRemoteNbr(remoteDay_res);
                    userService.updateUser(request.getUserId().getId(), user);

                }
            }
            if (Objects.equals(request.getInterneStatus(), "tl_validated")){
                //String subject = "Request Authorisation validated by Team Lead ";
                //User manager = userService.getmanager(requestLeave.getUserId().getTeam().getId());
                User manager = userService.getmanager(request.getUserId().getSuperior());
                String subject = "Demande d'authorisation validée par le team lead";
                String mail_template= "template-mail-validated-by-teamlead-request-authorisation.txt";
                //emailService.sendEmailFromTemplate(request.getUserId(), "email-template_1.txt" , subject,"Authorisation Request");
                emailService.sendEmailRequestAuthwithData(request.getUserId(),request, subject, mail_template);

                //emailService.sendEmailFromTemplate(manager, "email-template_3.txt" , subject,"Authorisation Request");
            }


            return new ResponseEntity<>(requestAuthorisationRepository.save(_RequestAuthorisation), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/RequestAuthorisation/remoteDays/{id}")
    public ResponseEntity<Double> getremoteDayById(@PathVariable("id") Integer user_id) {
        try {

            Optional<User> UserData = userService.findById(user_id);
            Double requestsday = null;
            if (UserData.isPresent()) {

                User user = UserData.get();

                requestsday = requestAuthorisationRepository.findRemoteDaysById(user_id);

                System.out.println(requestsday);

            }

            System.out.println(requestsday);

            return new ResponseEntity<>(requestsday, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/RequestAuthorisation/AuthorisationrequestBymonth/{id}")
    public ResponseEntity<List<Double> > getAuthorisationrequestBymonth(@PathVariable("id") Integer user_id) {
        try {
            List<Double> requestsdays = new ArrayList<Double>();

            Optional<User> UserData = userService.findById(user_id);
            Double requestsday = null;
            if (UserData.isPresent()) {

                User user = UserData.get();
                if (Objects.equals(user.getRole().getRole(), "admin") || Objects.equals(user.getRole().getRole(), "director")) {
                    for (var i=1 ;i<12 ; i++ ) {
                        requestsday = requestAuthorisationRepository.findRemoteDaysBymonth(i);
                        if (requestsday == null){
                            requestsday = 0.0;
                        }

                        requestsdays.add(requestsday);
                    }
                }else {
                    for (var i=1 ;i<12 ; i++ ) {
                        requestsday = requestAuthorisationRepository.findRemoteDaysBymonthbyid(user_id, i);
                        if (requestsday == null){
                            requestsday = 0.0;
                        }

                        requestsdays.add(requestsday);
                    }


                }

                System.out.println(requestsdays);

            }

            System.out.println(requestsday);

            return new ResponseEntity<>(requestsdays, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}