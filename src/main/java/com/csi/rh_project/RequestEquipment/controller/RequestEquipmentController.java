package com.csi.rh_project.RequestEquipment.controller;

import com.csi.rh_project.AdministrativeRequest.model.RequestAdministrative;
import com.csi.rh_project.RequestEquipment.Dto.RequestEquipmentDto;
import com.csi.rh_project.RequestEquipment.model.RequestEquipment;
import com.csi.rh_project.RequestEquipment.repository.RequestEquipmentRepository;

import com.csi.rh_project.RequestEquipment.service.RequestEquipmentService;
import com.csi.rh_project.auth.models.User;
import com.csi.rh_project.auth.services.EmailService;
import com.csi.rh_project.auth.services.UserService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.*;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class RequestEquipmentController {

    private final UserService userService;

    private final RequestEquipmentService requestEquipmentService;

    private final EmailService emailService;

    public RequestEquipmentController(UserService userService, EmailService emailService,
                                      RequestEquipmentService requestEquipmentService) {
        this.userService = userService;
        this.emailService = emailService;
        this.requestEquipmentService = requestEquipmentService;

    }

    @GetMapping("/RequestEquipment")
    public ResponseEntity<List<RequestEquipment>> getAllRequestsByEmployeeId(@RequestParam(required = false) Integer user_id) {
        try {
            System.out.println(user_id);

            List<RequestEquipment> requests = new ArrayList<RequestEquipment>();
            if (user_id != null) {
                Optional<User> user = userService.findById(user_id);
                requestEquipmentService.getRequestEquipmentByUserId(user.get());
            }
            else {
                requestEquipmentService.allRequestEquipment();

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

        Optional<RequestEquipment> EntityData = requestEquipmentService.findById(user_id);

        if (EntityData.isPresent()) {
            return new ResponseEntity<>(EntityData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/RequestEquipment")
    public ResponseEntity<RequestEquipment> createEntity(@RequestBody RequestEquipment request) {
        try {
            System.out.println(request);

            RequestEquipment _Request = requestEquipmentService.createRequestEquipment(request);

            System.out.println(_Request);
            //String subject = "Request Equipment created";
            List<User> _users = null;
            String subject = "Demande d'equipement Crée";
            String mail_template= "template-mail-create-request-authorisation.txt";

            if (Objects.equals(request.getUserId().getRole().getRole(), "teamLead")) {
                User user = userService.getmanager(request.getUserId().getSuperior());
                //emailService.sendEmailFromTemplateWithUserInfo(user, request.getUserId(), "email-template.txt" , subject,"Leave Request");
                emailService.sendEmailRequestEquipmentwithData(user ,request ,subject,  mail_template);


            } else  if (Objects.equals(request.getUserId().getRole().getRole(), "consultant"))  {
                //User _user = userService.getteamLead(request.getUserId().getTeam().getId());
                //emailService.sendEmailFromTemplateWithUserInfo(request.getUserId().getSuperior(), request.getUserId(), "email-template.txt" , subject,"Leave Request");

                emailService.sendEmailRequestEquipmentwithData(request.getUserId().getSuperior(),request ,subject,  mail_template);


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

            requestEquipmentService.deleteById(user_id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/RequestEquipment")
    public ResponseEntity<HttpStatus> deleteAllEntities() {
        try {
            requestEquipmentService.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @PutMapping("/RequestEquipment/{id}")
    public ResponseEntity<RequestEquipment> updateEntity(@PathVariable("id") long id, @RequestBody RequestEquipment request) {
        ResponseEntity<RequestEquipment> _RequestEquipment = requestEquipmentService.updateRequestEquipment(id,request);
        return _RequestEquipment;
    }


    @PutMapping("/RequestEquipment/updateStatus/{id}")
    public ResponseEntity<RequestEquipment> updateStatus(@PathVariable("id") long id, @RequestBody RequestEquipmentDto request) {
        Optional<RequestEquipment> EquipmentData = requestEquipmentService.findById(id);

        if (EquipmentData.isPresent()) {


            RequestEquipment _RequestEquipment = EquipmentData.get();

            /*_RequestEquipment.setStatus(request.getStatus());*/

            if (request.getEquipmentRef() != null) {
                _RequestEquipment.setEquipmentRef(request.getEquipmentRef());
            }



            if ( (!Objects.equals(request.getStatus(), "validated")) && (Objects.equals(request.getInterneStatus(), "validated"))){
                _RequestEquipment.setInterneStatus(request.getInterneStatus());

                if (request.getExist() != null && request.getExist()) {

                    String subject = "Demande d'equipement validé";
                    String mail_template= "template-mail-create-request-equipment.txt";
                    emailService.sendEmailRequestEquipmentwithData(request.getUserId().getSuperior(),_RequestEquipment ,subject,  mail_template);
                    //emailService.sendEmailFromTemplate(request.getUserId(), "email-template_4.txt", subject, "Equipment Request");

                } else {
                    String subject = "Demande d'equipement validée";
                    String mail_template= "template-mail-create-request-equipment.txt";
                    emailService.sendEmailRequestEquipmentwithData(request.getUserId().getSuperior(),_RequestEquipment ,subject,  mail_template);
                    //emailService.sendEmailFromTemplate(request.getUserId(), "email-template_1.txt", subject, "Equipment Request");
                }
            }
            if (Objects.equals(request.getStatus(), "validated")){
                _RequestEquipment.setStatus(request.getStatus());

                //String subject = "Request Equipment validated";
                //emailService.sendEmailFromTemplate(request.getUserId(), "email-template_1.txt" , subject,"Equipment Request");
                String subject = "Demande d'equipement validée";
                String mail_template= "template-mail-create-request-equipment.txt";
                emailService.sendEmailRequestEquipmentwithData(request.getUserId().getSuperior(),_RequestEquipment ,subject,  mail_template);


            }


            return new ResponseEntity<>(requestEquipmentService.save(_RequestEquipment), HttpStatus.OK);
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
                requests = requestEquipmentService.getAllRequestvalidationById(_User);

            }
            else {

                requests = requestEquipmentService.allRequestEquipment();

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