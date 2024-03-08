package com.csi.rh_project.RequestLeave.controller;
import java.util.*;


import com.csi.rh_project.RequestLeave.model.RequestLeave;
import com.csi.rh_project.RequestLeave.repository.RequestLeaveRepository;

import com.csi.rh_project.RequestLeave.service.RequestLeaveService;
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

    private final UserService userService;
    private final RequestLeaveService requestLeaveService;
    private final EmailService emailService;

    public RequestLeaveController(UserService userService,
                                  EmailService emailService,
                                  RequestLeaveService requestLeaveService) {
        this.userService = userService;
        this.emailService = emailService;
        this.requestLeaveService = requestLeaveService;

    }

    @GetMapping("/RequestLeave")
    public ResponseEntity<List<RequestLeave>> getAllRequestsByEmployeeId(@RequestParam(required = false) Integer user_id) {
        try {

            List<RequestLeave> requests = new ArrayList<RequestLeave>();
            Optional<User> user = userService.findById(user_id);
            requestLeaveService.getAllRequestsByEmployeeId(user.get()).forEach(requests::add);

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
        Optional<RequestLeave> EntityData = requestLeaveService.findById(user_id);
        if (EntityData.isPresent()) {
            return new ResponseEntity<>(EntityData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/RequestLeave")
    public ResponseEntity<RequestLeave> createEntity(@RequestBody RequestLeave request) {
        try {
            System.out.println(request);
            RequestLeave _Request  = requestLeaveService.createRequest(request);


            if (!Objects.equals(request.getUserId().getSuperior(), null)){
                String subject = "Demande de congé Crée";
                String mail_template= "template-mail-create-request-leave.txt";
                emailService.sendEmailRequestLeaveWithData(request.getUserId().getSuperior(),request, subject, mail_template);

            }


                return new ResponseEntity<>(_Request, HttpStatus.CREATED);

        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/RequestLeave/{id}")
    public ResponseEntity<HttpStatus> deleteRequestLeave(@PathVariable("id") long user_id) {
        try {

            requestLeaveService.deleteById(user_id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/RequestLeave")
    public ResponseEntity<HttpStatus> deleteAllRequestLeave() {
        try {
            requestLeaveService.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @PutMapping("/RequestLeave/{id}")
    public ResponseEntity<RequestLeave> updateRequestLeave(@PathVariable("id") long id, @RequestBody RequestLeave requestLeave) {
       return requestLeaveService.updateRequest(id,requestLeave);

    }

    @GetMapping("/RequestLeave/RequestLeavebyteam")
    public ResponseEntity<List<RequestLeave>> getAllRequestsByTeam(@RequestParam(required = false) Integer user_id) {
        try {

            List<RequestLeave> requests = new ArrayList<RequestLeave>();
            List<RequestLeave> requestsTL = new ArrayList<RequestLeave>();

            List<User> users;
            List<User> usersTL;

            Optional<User> userData = userService.findById(user_id);

            if (userData.isPresent()) {
                User _User = userData.get();
                if (Objects.equals(_User.getRole().getRole(), "director")){
                    requests= requestLeaveService.getRequestLeavesManager();

                }
                else {
                    System.out.println(_User.getId());

                    users = userService.findconsultantbySuperior(_User.getId());
                    System.out.println(users);

                    for (User user : users) {
                        /*requestLeaveService.getRequestLeavesNotManager(user).forEach(requests::add);*/
                        requests.addAll(requestLeaveService.getRequestLeavesofConsultant(user));
                        System.out.println(user.getRole().getRole());
                        System.out.println(user);

                        if(Objects.equals(user.getRole().getRole(), "teamLead")){

                            usersTL = userService.findconsultantbySuperior(user.getId());
                            System.out.println(usersTL);

                            for (User _user : usersTL) {

                                requestsTL.addAll(requestLeaveService.getRequestLeavesofConsultant(_user));
                            }
                            System.out.println(requestsTL);

                            requests.addAll(requestsTL);
                        }
                        System.out.println(requests);

                    }
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
        Optional<RequestLeave> EntityData = requestLeaveService.findById(id);

        if (EntityData.isPresent()) {
            RequestLeave _RequestLeave = EntityData.get();

            RequestLeave _Request = requestLeaveService.updateStatus(_RequestLeave,requestLeave);


            /*Requested Canceled Traitment*/
            if (Objects.equals(requestLeave.getInterneStatus(), "inactive")) {
                /*if (Objects.equals(requestLeave.getStatus(), "inactive")) {
                  String subject = "Demande de congé annulé";
                    String mail_template= "template-mail-canceled-request-leave.txt";
                    emailService.sendEmailRequestLeaveWithData(_Request.getUserId().getSuperior(), _Request.getUserId(),_Request, subject, mail_template);
                }*/

                if (Objects.equals(requestLeave.getStatus(), "ongoing")) {

                    /*Notif TL : request canceled and waiting for validation*/
                    //String subject = "Request Leave Canceled";
                    //User _user = userService.getteamLead(_RequestLeave.getUserId().getTeam().getId());
                    //emailService.sendEmailFromTemplateWithUserInfo(_RequestLeave.getUserId().getSuperior(), requestLeave.getUserId(), "email-template_1.txt", subject, "Leave Request");
                    //String Mailreference = "RequestLeaveCanceled";
                    //emailService.sendEmailFromMailTemplate(_RequestLeave.getUserId().getSuperior(), requestLeave.getUserId(),  "email-template.txt" ,Mailreference);
                    String subject = "Demande de congé annulé";
                    String mail_template= "template-mail-canceled-request-leave.txt";
                    emailService.sendEmailRequestLeaveWithData(_Request.getUserId().getSuperior(),_Request, subject, mail_template);


                }
            } else if (Objects.equals(_RequestLeave.getInterneStatus(), "tl_validated_inactive")) {
                /*Notif TL + manager */
                    //String subject = "Request Leave Canceled";
                    //List<User> users = userService.getteamLeadandManager(_RequestLeave.getUserId().getTeam().getId());
                    List<User> users = new ArrayList<>();
                    users.add(_RequestLeave.getUserId().getSuperior());
                    Optional<User> userOptional= userService.findById(_RequestLeave.getUserId().getSuperior().getId());
                    users.add(userOptional.get());
                    //String Mailreference = "RequestLeaveCanceled";
                    String subject = "Demande de congé annulé";
                    String mail_template= "template-mail-canceled-request-leave.txt";

                for (User user : users) {
                    //emailService.sendEmailFromTemplateWithUserInfo(user, requestLeave.getUserId(), "email-template_1.txt", subject, "Leave Request");

                    //emailService.sendEmailFromMailTemplate(user, requestLeave.getUserId(),  "email-template.txt" ,Mailreference);

                    emailService.sendEmailRequestLeaveWithData(user,_Request, subject, mail_template);

                }

            }else if (Objects.equals(_RequestLeave.getInterneStatus(), "validated_inactive")) {
                /*Notif TL + manager */
                //String subject = "Request Leave Canceled";
                //String Mailreference = "RequestLeaveCanceled";

                String subject = "Demande de congé annulé";

                List<User> users = new ArrayList<>();
                users.add(_RequestLeave.getUserId().getSuperior());
                Optional<User> userOptional= userService.findById(_RequestLeave.getUserId().getSuperior().getId());
                users.add(userOptional.get());
                String mail_template= "template-mail-canceled-request-leave.txt";

                for (User user : users) {
                    //emailService.sendEmailFromTemplateWithUserInfo(user, requestLeave.getUserId(), "email-template_1.txt", subject, "Leave Request");
                    //emailService.sendEmailFromMailTemplate(user, requestLeave.getUserId(),  "email-template.txt" ,Mailreference);
                    emailService.sendEmailRequestLeaveWithData(user,_Request, subject, mail_template);


                }
            }


            if (Objects.equals(requestLeave.getStatus(), "validated")){
                //String Mailreference = "RequestLeavevalidated";
                String subject = "Demande de congé validé";
                String mail_template= "template-mail-validated-request-leave.txt";

                //emailService.sendEmailFromTemplate(requestLeave.getUserId(), "email-template_1.txt" , subject,"Leave Request");
                //emailService.sendEmailFromMailTemplate(requestLeave.getUserId(), requestLeave.getUserId().getSuperior(), "email-template.txt" ,Mailreference);
                emailService.sendEmailRequestLeaveWithData(_Request.getUserId(),_Request, subject, mail_template);


            }
            if (Objects.equals(requestLeave.getInterneStatus(), "tl_validated")){
                //String Mailreference = "RequestLeaveValidatedByTeamlead ";

                //User manager = userService.getmanager(requestLeave.getUserId().getTeam().getId());
                //emailService.sendEmailFromTemplate(requestLeave.getUserId().getSuperior(), "email-template_2.txt" , subject,"Leave Request");
                //emailService.sendEmailFromMailTemplate(requestLeave.getUserId().getSuperior().getSuperior(), requestLeave.getUserId(), "email-template.txt" ,Mailreference);
                String subject = "Demande de congé validé";
                String mail_template= "template-mail-validated-by-teamlead-request-leave.txt";
                System.out.println(_Request.getUserId().getSuperior());
                emailService.sendEmailRequestLeaveWithData(_Request.getUserId().getSuperior().getSuperior(),_Request, subject, mail_template);

            }

            return new ResponseEntity<>(_Request, HttpStatus.OK);
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
    public ResponseEntity<List<RequestLeave>> getSickLeaveById(@PathVariable("id") Integer user_id) {
        try {
            System.out.println(user_id);
            List<RequestLeave> requests = new ArrayList<RequestLeave>();

            Optional<User> UserData = userService.findById(user_id);
            if (UserData.isPresent()) {

               User user = UserData.get();

                requests = requestLeaveService.getSickLeaveById(user);

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
    @GetMapping("/RequestLeave/requestValidated")
    public ResponseEntity<List<RequestLeave>> getRequestById() {
        try {

            List<RequestLeave> requests = new ArrayList<RequestLeave>();
            requests = requestLeaveService.getRequestLeavesValidated();

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

    @GetMapping("/RequestLeave/SickLeaveDays/{id}")
    public ResponseEntity<Double> getSickLeaveDayById(@PathVariable("id") Integer user_id) {
        try {

            Optional<User> UserData = userService.findById(user_id);
            Double requestsday = null;
            if (UserData.isPresent()) {
                User user = UserData.get();

                requestsday = requestLeaveService.getSickLeavesDaysById(user);

                System.out.println(requestsday);
            }

            return new ResponseEntity<>(requestsday, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/RequestLeave/RequestLeaveCanceledbyteam")
    public ResponseEntity<List<RequestLeave>> getAllCanceledRequestsByTeam(@RequestParam(required = false) Integer user_id) {
        try {

            List<RequestLeave> requests = new ArrayList<RequestLeave>();
            //List<User> users;

            Optional<User> userData = userService.findById(user_id);
            if (userData.isPresent()) {
                User _User = userData.get();
                requests = requestLeaveService.getAllCanceledRequestsByTeam(_User);
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

    @GetMapping("/RequestLeave/LeaverequestBymonth/{id}")
    public ResponseEntity<List<List<Double>> > getLeaverequestBymonth(@PathVariable("id") Integer user_id) {
        try {
            List<List<Double>> requests = new ArrayList<List<Double>>();
            List<Double> requestsdays = new ArrayList<Double>();

            List<String> typeList = Arrays.asList("sickLeave", "annualLeave","unpaidLeave","specialLeave", "rttLeave");

            Optional<User> UserData = userService.findById(user_id);
            Double requestsday = null;
            if (UserData.isPresent()) {

                User user = UserData.get();
                if (Objects.equals(user.getRole().getRole(), "admin") || Objects.equals(user.getRole().getRole(), "director")) {
                    for (var type : typeList) {
                        requestsdays = requestLeaveService.requestLeavebytypebymonth(0, type);

                        requests.add(requestsdays);
                    }
                } else {
                    for (var type : typeList) {
                        requestsdays = requestLeaveService.requestLeavebytypebymonth(user_id, type);

                        requests.add(requestsdays);
                    }


                }
            }

            return new ResponseEntity<>(requests, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/RequestLeave/LeaverequestBystatus/{id}")
    public ResponseEntity<List<Double> > LeaverequestBystatus(@PathVariable("id") Integer user_id) {
        try {
            List<Double> requestsdays = new ArrayList<Double>();

            Optional<User> UserData = userService.findById(user_id);
            Double requestsday = null;
            List<String> statusList = Arrays.asList("open", "ongoing", "validated", "inactive");

            if (UserData.isPresent()) {
                User user = UserData.get();
                requestsdays = requestLeaveService.LeaverequestBystatus(user);

                }

            return new ResponseEntity<>(requestsdays, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}